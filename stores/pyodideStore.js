import { defineStore } from 'pinia';
import { loadPyodide } from 'pyodide';

export const usePyodideStore = defineStore('pyodide', {
  state: () => ({
    pyodide: null,
    micropip: null,
    initialized: false,
    isRunningPython: false,
    initCheckPromise: null, // 用于检查初始化的 Promise
  }),
  actions: {
    async initialize() {
      // 如果 initPromise 已存在，直接返回Promise以等待它完成
      if (!this.initPromise) {
        this.initPromise = new Promise(async (resolve, reject) => {
          try {
            this.pyodide = await loadPyodide({
              indexURL: 'https://jsd.onmicrosoft.cn/pyodide/v0.26.2/full/',
            });
            console.log("Pyodide Ready!");
            this.initialized = true;
            resolve(); // 初始化完成，解决 Promise
          } catch (error) {
            reject(error); // 初始化失败，拒绝 Promise
          }
        });
      }
      console.debug("Initialized Pyodide Store");
      return this.initPromise; // 返回 Promise 以供后续等待
    },

    async checkInit() {
      // 检查初始化是否完成
      if (!this.initPromise) {
        return this.initialize(); // 如果没有 Promise，则调用 initialize
      }
      return this.initPromise; // 否则返回已存在的 Promise
    },

    async installDependency(pipDependency){
      await this.checkInit();
      if (pipDependency.length>0) {
        await this.pyodide.loadPackage(["micropip"]);
        this.micropip = this.pyodide.pyimport("micropip");
        await this.micropip.install(pipDependency);
      }
      console.log("Dependency Installed!")
    },

    async initIOSetting(){
      // 保存原始的 stdout 和 stderr
      // 标准输出 (sys.stdout) 和错误 (sys.stderr) 重定向为 StringIO 对象
      let pyCodeSetIO = `import sys;import io; _original_stdout = sys.stdout;_original_stderr = sys.stderr; sys.stdout = io.StringIO();sys.stderr = io.StringIO();import time;time.sleep = lambda x: None;\n`
      await this.pyodide.runPython(pyCodeSetIO);
    },

    async getStdOut(){
      let pyCodeCollectOut = `_captured_stdout = sys.stdout.getvalue();`
      await this.pyodide.runPythonAsync(pyCodeCollectOut);
      let output = await this.pyodide.runPythonAsync(`_captured_stdout`);
      return output;
    },

    async revertIOSetting(){
      // 恢复原始的 stdout 和 stderr
      let pyCodeRevertIO = `sys.stdout = _original_stdout;sys.stderr = _original_stderr`;
      await this.pyodide.runPython(pyCodeRevertIO);
    },

    async runPythonAsync(code) {
      await this.checkInit();
      let pyOut, pyErr;
      try {
        await this.initIOSetting();
        // 执行 Python 代码 + 获取最后一行的表达式结果
        let evalOut = await this.pyodide.runPythonAsync(code);
        // 获取捕获的输出和错误
        pyOut = await this.getStdOut() + (evalOut===undefined? '' : evalOut);
      } catch (error) {
        // Python代码报错会Raise PythonError但错误信息，堆栈需要在python中获取
        pyErr = await this.pyodide.runPythonAsync(`sys.stderr.getvalue()`);
      } finally {
        await this.revertIOSetting();
      }
      return pyErr===undefined? pyOut : pyErr;
    },
  },
});
