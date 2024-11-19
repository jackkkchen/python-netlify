---
title: Cursor Tutorial
description: Notes for AI beginners
navigation:
index: 1
icon: i-ph-info-duotone
---

# Cursor Tutorial

AI-Powered Development with Cursor: A Beginner's Guide
While ChatGPT and Kimi are powerful AI tools that many of you may be familiar with, we recommend Cursor or GitHub Copilot for programming, as they are specifically designed for coding environments. Let's explore how Cursor can enhance your programming experience.

在开始学习编程之前，我们需要选择一个合适的开发环境。而代码编辑器就是程序员的核心工具，就像画家需要画笔一样。它不仅仅是一个文本编辑器，更是一个功能强大的开发环境。VS Code (Visual Studio Code) 是由微软开发的最受欢迎的代码编辑器之一。除了编写代码之外，他更像是一个平台，里面有上千种拓展插件，可以根据你使用的编程语言来搭配使用，比如 Python、JavaScript、SQL、C等主流编程语言。而我们的Cursor就完美继承了Vscode的UI界面和功能，并在这个基础上更加强大了。

## Cursor 的 AI 对话功能
### 使用方法：
Cursor 内置了强大的 AI 对话功能，你可以通过快捷键 ⌘L (Mac) 或 Ctrl+L (Windows) 快速唤起对话框。或者在文件中选中一段代码/文字，然后点击Add to Chat，会自动添加到右边的聊天框中，进行提问或debug。这是我最常用的功能。

主要特点：
1. 智能上下文理解，自动分析当前代码环境或者Terminal中的bug解析
2. 使用 @ 符号引用项目中的文件，或者网站链接
3. 使用复制/粘贴图片，并识别图片内容

多模型支持
Claude 3.5 Sonnet：擅长代码理解和生成（默认）
cursor-small：适合简单快速的查询
GPT-4：强大的通用能力

## Cursor Composer：AI 驱动的项目创建助手
Composer 是 Cursor 编辑器中的一个强大功能，它能帮助你快速创建和搭建项目框架。通过简单的自然语言描述，你就能让 AI 帮助你生成完整的项目结构和代码

### 使用方法：
1. 使用快捷键 ⌘K (Mac) 或 Ctrl+K (Windows) 打开命令面板
2. 输入你想要创建的项目描述
3. AI 会根据你的描述生成相应的项目框架

### 主要特点：
1. 生成项目脚本框架；
2. 自动添加注释和文档，并进行代码补全；
3. 交互式开发，不断优化项目结构


### 如何提高AI提问的效率？
我的方法是先通过chat，把我的想法进行outline，列出来之后，用composer来逐步实现。比如，在CHAT中提问，“帮我列举想要熟练掌握Python编程需要学习哪些知识？帮我列举一个新手学习的流程”。这里注意到，我们非常明确的提出了“新手”，“Python”，“流程”，这样更有助于ai回答我们想要的答案。然后我们可以根据Chat给的流程，将其按步骤放到Composer中，让他帮我们生成实际的Python代码案例并解释。这里需要注意的是，不要一次性给很多东西，这样会产生很多误导性回答，我们需要分步骤，一步步进行提问，在不断提问的过程中得到结果。

#### 分步骤提问策略
在 Cursor 中，我们可以采用 "Chat 先行，Composer 跟进" 的策略来提高与 AI 交互的效率。

**第一步：使用 Chat 进行概念梳理**
1. 明确关键词
- 例如："帮我列举想要熟练掌握Python编程需要学习哪些知识？帮我列举一个新手学习的流程"
- 使用具体且清晰的关键词（如 "新手"、"Python"、"流程"）
- 避免模糊或歧义的表述

2. 结构化提问
- 将复杂问题拆分成小步骤
- 使用清晰的条目或大纲形式，让 AI 更容易理解你的需求

**第二步：利用 Composer 实现代码**
1. 循序渐进
- 基于 Chat 的反馈逐步实现
2. 每次只关注一个具体功能或概念
- 避免一次性要求过多功能
3. 迭代优化
- 根据 AI 的回答进行调整
- 不断细化和完善需求
- 保持对话的连贯性

**提高效率的关键点**
1. 提供清晰上下文
- 使用 @ 引用相关文件
- 说明代码的具体用途
- 描述预期的结果

2. 保持对话聚焦
- 避免在单次提问中包含多个主题
- 一次只解决一个问题
- 循序渐进地构建复杂功能

1. 善用反馈循环
- 基于 AI 的回答提出后续问题
- 及时纠正误解
- 持续优化提问方式