# Pandas

## 1. Introduction to Pandas

Pandas is an open-source data analysis and manipulation library that is based on the Python programming language.

Pandas provides easy-to-use data structures and data analysis tools, especially suitable for handling structured data, such as tabular data (similar to Excel spreadsheets).

Pandas is one of the commonly used tools in the field of data science and analysis, allowing users to easily import data from various data sources and perform efficient operations and analysis on the data.

Pandas offers a wealth of features, including:

- Data cleaning: Handling missing data, duplicate data, etc.
- Data transformation: Changing the shape, structure, or format of data.
- Data analysis: Performing statistical analysis, aggregation, grouping, etc.
- Data visualization: By integrating libraries such as Matplotlib and Seaborn, data visualization can be carried out.

## 2. Data Structures in Pandas

Pandas mainly introduces two new data structures: **DataFrame** and **Series**.

- **Series**: Similar to a one-dimensional array or list, it is composed of a set of data and related data labels (indexes). A Series can be considered as a column in a DataFrame or a standalone one-dimensional data structure.
- **DataFrame**: Similar to a two-dimensional table, it is the most important data structure in Pandas. A DataFrame can be considered as a table composed of multiple Series arranged by columns, with both row and column indexes, making it easy to perform row and column selection, filtering, merging, and other operations.

> [!Note]
> A DataFrame can be viewed as a data structure composed of multiple Series.

### 1. Pandas Series

Pandas `Series` is a flexible, one-dimensional indexed data structure that can store data of various types (such as integers, floating-point numbers, strings, timestamps, etc.). Each data item has an associated label (index), similar to key-value pairs in a dictionary. The main features of `Series` include:

- **One-dimensional array structure**: `Series` is a one-dimensional data structure, similar to NumPy arrays, but more flexible.
- **Indexing feature**: Each data item has a unique index, which can be default integer values (such as 0, 1, 2...) or custom (such as characters, dates, etc.). Indexing allows for fast access and slicing.
- **Flexible data types**: `Series` supports various data types, including integers, floating-point numbers, boolean values, strings, timestamps, etc.
- **Automatic alignment operations**: When operating with multiple `Series` objects, Pandas automatically aligns the data based on the index.
- **Handling missing values**: `Series` supports handling missing values (usually represented by `NaN`) and can intelligently ignore missing values during calculations.
- **Immutable size**: Once a `Series` is created, its size is fixed, but you can adjust the size by generating a new object using methods like `append` and `drop`.

We can create a `Series` object through the `pd.Series()` constructor, passing in data (such as a list, NumPy array, etc.) and an optional index array.

```python
# Constructor and parameters
pandas.Series(data=None, index=None, dtype=None, name=None, copy=False, fastpath=False)
```

Parameter description:
- **`data`**: The data part of the `Series`, which can be a list, array, dictionary, scalar value, etc. If this parameter is not provided, an empty `Series` will be created.
- **`index`**: The index part of the `Series`, used to mark each data item. It can be a list, array, or index object, etc. If not specified, a default integer index starting from 0 will be generated.
- **`dtype`**: Specifies the data type of the `Series`. Supports NumPy data types, such as `np.int64`, `np.float64`, etc. If not specified, the system will automatically infer the type based on the input data.
- **`name`**: Assigns a name to the `Series` object. If this parameter is provided, the generated `Series` will have the corresponding name.
- **`copy`**: Whether to copy the data. If set to `True`, the input data will be copied. The default value is `False`, indicating no copy.
- **`fastpath`**: Whether to enable the fast path. The default is `False`. This parameter is generally used for internal optimization and may improve performance when enabled.

The following is a basic example showing how to create a `Series` using a list:

```python
import pandas as pd

# Create a Series
data = pd.Series([100, 200, 300, 400])

# Output Series
print(data)
```

Output:
```
0    100
1    200
2    300
3    400
dtype: int64
```

In this example, the `Series` automatically uses an integer index starting from 0. We can access specific data through the index value:

```python
print(data[1])  # Output 200
```

Additionally, we can create a `Series` with custom indexes:

```python
import pandas as pd

# Create a Series with custom index
data = pd.Series([100, 200, 300, 400], index=["A", "B", "C", "D"])

# Output Series
print(data)
```

Output:
```
A    100
B    200
C    300
D    400
dtype: int64
```

At this point, the index is `A`, `B`, `C`, and `D`. We can access the corresponding data using the index value:

```python
print(data["A"])  # Output 100
```

By passing a dictionary, we can also create a `Series`. The keys of the dictionary will serve as the index of the `Series`, and the values will serve as the data of the `Series`:

```python
import pandas as pd

# Create a Series using a dictionary
data_dict = {"A": 10, "B": 20, "C": 30, "D": 40}
data_series = pd.Series(data_dict)

# Output Series
print(data_series)
```

Output:
```
A    10
B    20
C    30
D    40
dtype: int64
```

If you don't need all the data from the dictionary, you can also specify indexes when creating a `Series` to select part of the dictionary's data:

```python
# Select only some indexes
partial_series = pd.Series(data_dict, index=["A", "C"])
print(partial_series)
```

Output:
```
A    10
C    30
dtype: int64
```

In summary, Pandas `Series` is a very flexible and powerful data structure, suitable for handling one-dimensional data with indexes. Whether it's a simple data list or complex data constructed through dictionaries and arrays, `Series` provides powerful operations and retrieval functions, especially suitable for scenarios involving labeled data.

### 2. Pandas DataFrame

Pandas `DataFrame` is a two-dimensional data structure with row and column labels, similar to a spreadsheet or SQL table. It can store various types of data (such as integers, floating-point numbers, strings, timestamps, etc.) and combine different types of data for processing. `DataFrame` is one of the most commonly used data structures in the Pandas library and is widely used in data analysis, cleaning, and manipulation.

The main features of `DataFrame` include:

- **Two-dimensional data structure**: `DataFrame` is a tabular data structure with rows and columns, supporting multiple data types.
- **Flexible row and column indexing**: Both rows and columns have corresponding labels (indexes), supporting custom or automatically generated integer indexes. Indexing can be used for fast data location.
- **Heterogeneous data types**: Different columns can store different types of data (for example, one column can be strings, and another column can be floating-point numbers).
- **Automatic alignment operations**: When operating with multiple `DataFrame` objects, Pandas automatically aligns the data based on the row and column indexes.
- **Missing value handling**: `DataFrame` supports missing values, usually represented by `NaN`, and provides a wealth of methods to handle missing data.
- **Rich operational features**: `DataFrame` offers flexible operations on data, such as adding or deleting rows and columns, filtering, sorting, merging, and grouping.

We can create a `DataFrame` through the `pd.DataFrame()` constructor, passing in data in various forms (such as dictionaries, lists, NumPy arrays, etc.).

```python
# Constructor and parameters
pandas.DataFrame(data=None, index=None, columns=None, dtype=None, copy=False)
```

Parameter description:
- `data`: The data part of the `DataFrame`, which can be a dictionary, list, two-dimensional array, NumPy array, or another `DataFrame`. Different data structures have different default behaviors. For example, the keys of a dictionary become column names, and the list becomes row data.
- `index`: The row index of the ` DataFrame `. If not specified, Pandas generates an integer index starting from 0.
- `columns`: The column labels of the `DataFrame`. If not specified, Pandas automatically uses the keys from the input data (such as the keys of a dictionary) or an integer index starting from 0.
- `dtype`: Specifies the data type of the `DataFrame`. It can be a NumPy data type; if not specified, Pandas will automatically infer the type based on the input data.
- `copy`: Whether to copy the data. The default is `False`, indicating no copy. If set to `True`, the input data will be copied.

Here are some simple examples of creating a `DataFrame`:

One of the most common ways to create a `DataFrame` is by using a dictionary, where the keys of the dictionary become the column names, and the values become the column data:

```python
import pandas as pd

# Create DataFrame using a dictionary
data = {
    "Name": ["Tom", "Jerry", "Spike"],
    "Age": [28, 22, 25],
    "Score": [85, 92, 78]
}

df = pd.DataFrame(data)

# Output DataFrame
print(df)
```

Output:
```
    Name  Age  Score
0    Tom   28     85
1  Jerry   22     92
2  Spike   25     78
```

In this example, the keys `Name`, `Age`, and `Score` of the dictionary become the column names, and the list data becomes the values for each column. Pandas automatically generates an integer index starting from 0.

In addition to using a dictionary, we can also use a list of nested lists to create a `DataFrame`, where each nested list represents a row of data:

```python
import pandas as pd

# Create DataFrame using a nested list
data = [
    ["Tom", 28, 85],
    ["Jerry", 22, 92],
    ["Spike", 25, 78]
]

df = pd.DataFrame(data, columns=["Name", "Age", "Score"])

# Output DataFrame
print(df)
```

Output:
```
    Name  Age  Score
0    Tom   28     85
1  Jerry   22     92
2  Spike   25     78
```

Here, we explicitly specified the column names through the `columns` parameter, and each sublist in the list corresponds to a row in the `DataFrame`.

Based on the flexibility of pandas, we can also use NumPy arrays to create DataFrames, which is suitable for large numerical datasets:

```python
import pandas as pd
import numpy as np

# Create DataFrame using a NumPy array
data = np.array([[85, 28], [92, 22], [78, 25]])

df = pd.DataFrame(data, columns=["Score", "Age"], index=["Tom", "Jerry", "Spike"])

# Output DataFrame
print(df)
```

Output:
```
       Score  Age
Tom       85   28
Jerry     92   22
Spike     78   25
```

In this example, we used the `index` parameter to assign custom labels to the rows of the `DataFrame`.

Finally, if the data is stored in a list of dictionaries (such as JSON), it can be directly passed in:

```python
import pandas as pd

# Create DataFrame using a list of dictionaries
data = [
    {"Name": "Tom", "Age": 28, "Score": 85},
    {"Name": "Jerry", "Age": 22, "Score": 92},
    {"Name": "Spike", "Age": 25, "Score": 78}
]

df = pd.DataFrame(data)

# Output DataFrame
print(df)
```

Output:
```
    Name  Age  Score
0    Tom   28     85
1  Jerry   22     92
2  Spike   25     78
```

For `DataFrame`, there are common operations such as:

1. Accessing a column: You can access a specific column by its name.

```python
import pandas as pd

# Create DataFrame
data = {
    "Name": ["Tom", "Jerry", "Spike"],
    "Age": [28, 22, 25],
    "Score": [85, 92, 78]
}
df = pd.DataFrame(data)

# Access the 'Name' column
print(df["Name"])
```

Output:
```
0      Tom
1    Jerry
2    Spike
Name: Name, dtype: object
```

2. Adding a new column: You can easily add a new column through an assignment statement.

```python
# Add a new column 'City'
df["City"] = ["NY", "LA", "SF"]

# Output DataFrame
print(df)
```

Output:
```
    Name  Age  Score City
0    Tom   28     85   NY
1  Jerry   22     92   LA
2  Spike   25     78   SF
```

3. Deleting a column: Use the `drop()` method to delete a column.

```python
# Delete the 'Age' column
df_dropped = df.drop("Age", axis=1)

# Output the DataFrame after deletion
print(df_dropped)
```

Output:
```
    Name  Score City
0    Tom     85   NY
1  Jerry     92   LA
2  Spike     78   SF
```

4. Filtering data: You can filter data through conditional expressions.

```python
# Filter data where 'Score' is greater than 80
filtered_df = df[df["Score"] > 80]

# Output the filtered result
print(filtered_df)
```

Output:
```
    Name  Age  Score City
1  Jerry   22     92   LA
```

5. Calculating statistical information: `DataFrame` provides a wealth of statistical methods. The following example shows how to calculate the mean and descriptive statistical information:

```python
# Calculate the mean
mean_score = df["Score"].mean()
print(f"Average score: {mean_score}")

# Output descriptive statistical information of DataFrame
print(df.describe())
```

Output:
```
Average score: 85.0
             Age      Score
count   3.000000   3.000000
mean   25.000000  85.000000
std     3.000000   7.000000
min    22.000000  78.000000
25%    23.500000  81.500000
50%    25.000000  85.000000
75%    26.500000  88.500000
max    28.000000  92.000000
```

6. Handling missing values: You can use `isna()` to check for missing values and `fillna()` to fill them. The following example shows how to handle missing data:

```python
# Create DataFrame with missing values
data_with_na = {
    "Name": ["Tom", "Jerry", "Spike"],
    "Age": [28, None, 25],
    "Score": [85, 92, None]
}
df_with_na = pd.DataFrame(data_with_na)

# Check for missing values
print(df_with_na.isna())

# Fill missing values
df_filled = df_with_na.fillna(0)

# Output the filled DataFrame
print(df_filled)
```

Output:
```
    Name    Age  Score
0    Tom  False  False
1  Jerry   True  False
2  Spike  False   True

    Name   Age  Score
0    Tom  28.0   85.0
1  Jerry   0.0   92.0
2  Spike  25.0    0.0
```

In summary, Pandas `DataFrame` is a powerful and flexible two-dimensional data structure widely used in various data analysis tasks. Whether dealing with numerical data, time series, or structured tabular data, `DataFrame` provides efficient and convenient operations and processing methods.

## 3. Pandas and Common File Formats

### 1. Pandas and CSV

CSV (Comma-Separated Values) is a common file format that is simple and lightweight, widely used for data transfer and storage. Pandas is a powerful tool in Python for data analysis and processing, and it can easily read, analyze, and process CSV files. This article will use a classic `example.csv` file as an example to demonstrate common operations in Pandas.

```mathematica
ID,Name,Age,Gender,Department,Salary,HireDate,PerformanceScore,City
1,John Smith,28,Male,Sales,50000,2018-05-21,85,New York
2,Mary Johnson,34,Female,HR,62000,2017-03-15,92,Los Angeles
3,James Brown,45,Male,IT,72000,2015-09-30,78,Chicago
4,Patricia Garcia,29,Female,Finance,55000,2019-07-11,88,Houston
5,Robert Martinez,41,Male,Marketing,68000,2016-04-20,80,Miami
6,Linda Anderson,36,Female,Sales,59000,2018-11-12,90,Boston
7,Michael Wilson,38,Male,HR,63000,2017-06-07,86,San Francisco
8,Elizabeth Taylor,30,Female,IT,74000,2019-02-23,75,Dallas
9,David Lee,25,Male,Finance,52000,2020-08-14,82,Austin
10,Barbara Hernandez,32,Female,Marketing,67000,2017-10-19,83,Seattle
11,William Clark,29,Male,Sales,56000,2019-12-01,81,Denver
12,Jennifer Lewis,35,Female,HR,60000,2018-01-27,87,Las Vegas
13,Joseph Walker,40,Male,IT,73000,2015-05-10,76,San Diego
14,Susan Hall,33,Female,Finance,56000,2018-09-18,89,New Orleans
15,Charles Young,50,Male,Marketing,78000,2014-11-05,90,Portland
16,Karen King,26,Female,Sales,48000,2020-02-10,84,Columbus
17,Thomas Wright,37,Male,HR,61000,2016-07-15,82,Charlotte
18,Lisa Scott,31,Female,IT,75000,2019-04-29,74,Detroit
19,Christopher Green,47,Male,Finance,70000,2014-06-19,79,Indianapolis
20,Amy Adams,27,Female,Marketing,53000,2019-01-20,85,Nashville
21,Mark Baker,44,Male,Sales,68000,2015-10-03,88,Jacksonville
22,Sarah Gonzalez,39,Female,HR,62000,2017-08-23,81,Memphis
23,Paul Nelson,33,Male,IT,72000,2016-05-09,77,Fort Worth
24,Donna Mitchell,42,Female,Finance,69000,2016-12-27,91,El Paso
25,Steven Perez,28,Male,Marketing,55000,2020-03-05,80,Milwaukee
26,Nancy Roberts,31,Female,Sales,52000,2019-10-15,86,Baltimore
27,Matthew Turner,46,Male,HR,60000,2014-08-21,82,Louisville
28,Dorothy Phillips,34,Female,IT,76000,2016-01-12,74,Oklahoma City
29,Ronald Campbell,43,Male,Finance,72000,2015-03-19,87,Albuquerque
30,Laura Parker,30,Female,Marketing,57000,2020-06-07,80,Kansas City
```

1. Read CSV file: Use `pd.read_csv()` to read a CSV file into a Pandas `DataFrame` object.

```python
import pandas as pd

# Read CSV file
df = pd.read_csv('example.csv')

# Display the first few rows of data
print(df.to_string())
```

> [!Note]
> `to_string()` is used to print the entire DataFrame to avoid Pandas' default behavior of only displaying the first and last 5 rows of data. If the file is large, it is not recommended to use this method, as the output may be very large.

2. View the first and last specified rows:
	- Use `head(n)` to display the first `n` rows of the dataset; if `n` is not specified, the default is to return the first 5 rows.
	- Use `tail(n)` to display the last `n` rows of the dataset; if `n` is not specified, the default is to return the last 5 rows.

```python
# Display the first 5 rows (default)
print(df.head())

# Display the first 10 rows
print(df.head(10))

# Display the last 5 rows (default)
print(df.tail())

# Display the last 10 rows
print(df.tail(10))
```

3. Get basic information: Use the `info()` method to get basic information about the data, such as column names, data types, the number of non-null values, etc.

```python
# Get basic information about the data
df.info()
```

This will return output similar to the following:

```kotlin
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 30 entries, 0 to 29
Data columns (total 9 columns):
 #   Column            Non-Null Count  Dtype  
---  ------            --------------  -----  
 0   ID                30 non-null     int64  
 1   Name              30 non-null     object 
 2   Age               30 non-null     int64  
 3   Gender            30 non-null     object 
 4   Department        30 non-null     object 
 5   Salary            30 non-null     int64  
 6   HireDate          30 non-null     object 
 7   PerformanceScore  30 non-null     int64  
 8   City              30 non-null     object 
dtypes: int64(4), object(5)
memory usage: 2.2 KB

```

4. Calculate statistical information: The `describe()` method can quickly obtain statistical information about numerical columns, such as mean, standard deviation, minimum, and maximum values.

```python
# Calculate statistical information for numerical columns
print(df.describe())
```

This method will return a statistical summary of the numerical columns:

```shell
ID        Age        Salary  PerformanceScore
count  30.000000  30.000000     30.000000         30.000000
mean   15.500000  34.033333  61866.666667         83.166667
std     8.803408   7.078767   8316.953748          5.197034
min     1.000000  25.000000  48000.000000         74.000000
25%     8.250000  29.000000  56000.000000         80.000000
50%    15.500000  33.000000  62000.000000         83.000000
75%    22.750000  40.250000  68000.000000         87.000000
max    30.000000  50.000000  78000.000000         92.000000
```

5. Filter data: You can filter data based on conditions, such as filtering employees who are older than 30 and have a salary over 60000.

```python
filtered_df = df[(df["Age"] > 30) & (df["Salary"] > 60000)]
print(filtered_df)
```

6. Save the modified DataFrame

```python
# Save as a new CSV file
df.to_csv('example_modified.csv', index=False)
```

### 2. Pandas and JSON

Pandas handles JSON data very efficiently, converting JSON data structures into DataFrames, which simplifies complex nested data formats. JSON (JavaScript Object Notation) is a lightweight data interchange format widely used in web development and API responses. This article will show how to use Pandas to handle JSON data.

Let's take a JSON data example containing employee information:

```json
[
    {"ID": 1, "Name": "John Smith", "Age": 28, "Gender": "Male", "Department": "Sales", "Salary": 50000, "HireDate": "2018-05-21", "PerformanceScore": 85, "City": "New York"},
    {"ID": 2, "Name": "Mary Johnson", "Age": 34, "Gender": "Female", "Department": "HR", "Salary": 62000, "HireDate": "2017-03-15", "PerformanceScore": 92, "City": "Los Angeles"},
    {"ID": 3, "Name": "James Brown","Age": 45, "Gender": "Male", "Department": "IT", "Salary": 72000, "HireDate": "2015-09-30", "PerformanceScore": 78, "City": "Chicago"}
    ]
```

1. Read JSON file: Pandas can use `pd.read_json()` to directly read JSON files. JSON data formats support lists, dictionaries, and more complex nested structures.

```python
import pandas as pd

# Read JSON file
df = pd.read_json('example.json')

# Display data
print(df.to_string())
```

2. Handle JSON with nested structures: JSON files may contain nested structures, and Pandas can handle these nested fields. For deeply nested JSON structures, you usually need to flatten or extract the nested fields into separate columns first.

Assuming the JSON data has a nested `Address` field:

```json
{
	"ID": 1,
	"Name": "John Smith",
	"Age": 28,
	"Address": {"City": "New York", "PostalCode": "10001"},
	"Department": "Sales",
	"Salary": 50000,
	"HireDate": "2018-05-21"
}
```

You can use Pandas' `json_normalize` method to flatten the nested fields:

```python
import pandas as pd
from pandas import json_normalize

# Nested JSON data
data = {
	"ID": 1,
	"Name": "John Smith",
	"Age": 28,
	"Address": {"City": "New York", "PostalCode": "10001"},
	"Department": "Sales",
	"Salary": 50000,
	"HireDate": "2018-05-21"
}

# Flatten nested fields using json_normalize
df = json_normalize(data)
print(df.to_string())
```

Output result:

```
   ID        Name  Age        Department  Salary    HireDate    Address.City  Address.PostalCode
0   1  John Smith   28           Sales    50000  2018-05-21     New York              10001
```

For complex JSON files, such as multi-layer nested JSON data from APIs, `json_normalize` can also flatten multiple nested layers according to the path. For example, assuming the JSON data has more nested layers:

```json
{
	"ID": 1,
	"Name": "John Smith",
	"Details": {
		"Age": 28,
		"Address": {
			"City": "New York",
			"PostalCode": "10001"
		}
	},
	"Department": "Sales",
	"Salary": 50000,
	"HireDate": "2018-05-21"
}
```

You can specify the path to flatten multiple nested layers:

```python
import pandas as pd
from pandas import json_normalize

# Complex nested JSON data
data = {
	"ID": 1,
	"Name": "John Smith",
	"Details": {
		"Age": 28,
		"Address": {
			"City": "New York",
			"PostalCode": "10001"
		}
	},
	"Department": "Sales",
	"Salary": 50000,
	"HireDate": "2018-05-21"
}

# Flatten nested layers
df = json_normalize(data, sep='_')
print(df.to_string())
```

Output result:

```
   ID        Name  Details_Age  Details_Address_City  Details_Address_PostalCode  Department  Salary    HireDate
0   1  John Smith           28              New York                      10001       Sales   50000  2018-05-21
```

Here we used `sep='_'` to control the format of the names of the flattened nested fields, making the DataFrame clearer and easier to read.

3. Save DataFrame as JSON: After processing JSON data, you can save it back to JSON format. Pandas provides the `to_json()` method for this task.

```python
# Save DataFrame as JSON file
df.to_json('output.json', orient='records', lines=True)
```

- `orient='records'` specifies that each row is output as a JSON object.
- `lines=True` is used to output a multi-line JSON file, where each line is an independent JSON record, suitable for processing large datasets.

In summary, Pandas is a powerful tool for handling JSON data, especially for complex nested JSON. Pandas provides convenient tools to convert data into tabular format for analysis and manipulation. With Pandas, we can easily read, process, and store JSON data, simplifying the data analysis process.

## 4. Pandas and Data Cleaning

Data cleaning is the process of dealing with unusable data. In practice, it is common to encounter missing data, incorrect data formats, erroneous data, or duplicate data. To make the results of data analysis more accurate, it is necessary to process these unusable data. Pandas provides a variety of functions to help clean, check, and correct problems in data.

### 1. Handling Missing Values

In the process of data cleaning, dealing with missing values is a very common and basic task. Pandas offers a wealth of methods to find, count, and handle these missing values. Below we will discuss in detail how to effectively use Pandas to handle missing values, especially best practices when deleting missing values.

1. Finding missing values: Missing values in the data can be found using the `isna()` or `isnull()` methods. These two methods are equivalent and return a boolean DataFrame, where `True` indicates that the value is empty.

```python
import pandas as pd

# Create data with missing values
data = {
	"Name": ["Alice", "Bob", None],
	"Age": [25, None, 30],
	"Salary": [50000, 60000, None]
}
df = pd.DataFrame(data)

# Find missing values
print(df.isna())
```

> [!Note]
> It should be noted that in some cases, missing values are not only represented by standard `NaN` but may also appear in other forms, such as `"n/a"` or `"--"`. Pandas provides the `na_values` parameter, which allows us to specify these custom missing value types when reading data.
> ```python
> # Custom missing value forms
> missing_values = ["n/a", "na", "--"]
> df = pd.read_csv('example.csv', na_values=missing_values)
> ```

2. Counting missing values: You can combine `isna()` with `sum()` to count the number of missing values in each column. The boolean values returned by `isna()` can be summarized by `sum()` to show the number of missing values in each column.

```python
# Count the number of missing values in each column
print(df.isna().sum())
```

3. Deleting missing values: When dealing with missing values, deleting rows or columns that contain missing values is a common operation, especially when the proportion of missing data is large. You can use the `dropna()` method to delete missing values. `dropna()` provides various flexible parameters, depending on specific needs, to decide whether to delete entire rows or columns, or only under certain specific conditions.

```python
# Syntax:
DataFrame.dropna(axis=0, how='any', thresh=None, subset=None, inplace=False)
```

Parameter description:

- `axis`: Specifies the direction to delete. The default is `0`, which means to delete rows containing missing values; if set to `1`, it deletes columns containing missing values.
- `how`: Specifies the condition for deletion. The default value is `'any'`, which means to delete a row or column if there is any missing value; if set to `'all'`, it only deletes a row or column if all values are missing.
- `thresh`: Sets a threshold, requiring the row or column to have at least `thresh` non-missing values to be retained. For example, if `thresh=2`, it means to retain rows or columns with at least two non-missing values.
- `subset`: Specifies the columns to check for missing values. If only certain columns need to be checked, this can be achieved by passing a list of column names.
- `inplace`: If set to `True`, the deletion operation is performed on the original DataFrame and does not return a new object; if `False` (default value), a new DataFrame is returned.

```python
# Delete rows containing any missing values
df_cleaned = df.dropna()

# Delete rows that have missing values only in 'Name' and 'Age' columns
df_cleaned_subset = df.dropna(subset=['Name', 'Age'])

# Delete rows that contain all missing values
df_cleaned_all = df.dropna(how='all')

# Retain rows with at least two non-missing values
df_thresh = df.dropna(thresh=2)
```

4. Filling missing values: Sometimes we do not want to delete data but retain as much

 information as possible by filling in the missing values. The `fillna()` method can be used to fill in missing values, and common filling strategies include using a fixed value, mean, median, or the previous or next valid value for filling.

```python
# Fill all missing values with 0
df_filled_zero = df.fillna(0)

# Fill missing values in the 'Age' column with the mean value (e.g., 'Age' column)
df['Age'] = df['Age'].fillna(df['Age'].mean())

# Fill missing values with the previous valid value (i.e., forward fill)
df_filled_ffill = df.fillna(method='ffill')

# Fill missing values with the next valid value (i.e., backward fill)
df_filled_bfill = df.fillna(method='bfill')
```

Pandas provides powerful functions for handling missing values, including finding, counting, deleting, and filling. In data cleaning, the appropriate method for handling missing values depends on the specific situation of the data. By reasonably using `dropna()` and `fillna()`, you can effectively maintain the integrity of the data and the accuracy of the analysis results.

### 2. Handling Duplicate Values

Duplicate data can lead to biased analysis results, so it is necessary to deduplicate the data.

1. Find duplicate data: You can use the `duplicated()` method to find duplicate data. This method returns a boolean series indicating whether each row is a duplicate.

```python
# Find duplicate rows
print(df.duplicated())
```

2. Delete duplicate data: You can use the `drop_duplicates()` method to delete duplicate rows. The `subset` parameter can specify the columns to check for duplicates. If not specified, all columns are checked.

```python
# Delete duplicate rows
df_unique = df.drop_duplicates()

# Delete duplicate rows based only on the 'Name' column
df_unique_name = df.drop_duplicates(subset=['Name'])
```

### 3. Converting Data Types

Sometimes, data may have incorrect data types, such as an age field stored as a string type. You can use the `astype()` method to convert the column to the correct data type.

```python
# Convert the 'Age' column to integer type
df['Age'] = df['Age'].astype(int)
```

Sometimes, the data type may be correct, but the data format is incorrect, such as a date column containing data in multiple formats. We can use `to_datetime` and `strftime` to standardize the formats:

```python
import pandas as pd

# Create a DataFrame with multiple date formats
data = {'Date': ['2023-01-01 12:34:56', '2023/02/02', '03/04/2023', '2023-05-06T10:11:12Z']}
df = pd.DataFrame(data)

# Use the to_datetime() function, specify error handling as coerce, and try multiple common date formats
df['Date'] = pd.to_datetime(df['Date'], errors='coerce', infer_datetime_format=True)

# Standardize the date format to "YYYY-MM-DD"
df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')

print(df)
```

### 5. Data Standardization

To ensure data standardization, you can convert string fields to lowercase or uppercase, or remove excess spaces.

```python
# Convert the 'Name' column to lowercase
df['Name'] = df['Name'].str.lower()

# Remove excess spaces from the 'Name' column
df['Name'] = df['Name'].str.strip()
```

## 5. Summary of Common Pandas Functions

### 1. Data Reading, Viewing, and Cleaning

In the above articles, we have learned about the most basic functions of Pandas:

| Function                                    | Description               |
| ------------------------------------- | ---------------- |
| pd.read_csv(filename)                 | Read a CSV file;       |
| pd.read_excel(filename)               | Read an Excel file;     |
| pd.read_sql(query, connection_object) | Read data from a SQL database;   |
| pd.read_json(json_string)             | Read data from a JSON string; |
| pd.read_html(url)                     | Read data from an HTML page.  |
| df.head(n)    | Display the first n rows of data;                    |
| df.tail(n)    | Display the last n rows of data;                    |
| df.info()     | Display information about the data, including column names, data types, missing values, etc.;       |
| df.describe() | Display basic statistical information about the data, including mean, variance, maximum, minimum, etc.; |
| df.shape      | Display the number of rows and columns of the data.                   |
| df.dropna()                      | Delete rows or columns containing missing values; |
| df.fillna(value)                 | Replace missing values with a specified value; |
| df.replace(old_value, new_value) | Replace a specified value with a new value;   |
| df.duplicated()                  | Check for duplicate data;  |
| df.drop_duplicates()             | Delete duplicate data.     |

### 2. Data Selection and Slicing

1. Directly obtain column data through column name: `df[column_name]`

```python
import pandas as pd

# Create a DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 28]}
df = pd.DataFrame(data)

# Select the 'Age' column
age_column = df['Age']
print(age_column)
```

2. Select data through label: `df.loc[row_index, column_name]`

```python
# Select the first row, 'Name' column
first_name = df.loc[0, 'Name']
print(first_name)
```

3. Select data through index: `df.iloc[row_index, column_index]`

```python
# Select the second row, first column (index starts from 0)
second_row_first_column = df.iloc[1, 0]
print(second_row_first_column)
```

4. Select multiple columns through a list of column names: `df.filter(items=[column_name1, column_name2])`

```python
# Select 'Name' and 'Age' columns
selected_columns = df.filter(items=['Name', 'Age'])
print(selected_columns)
```

5. Select columns that match a regular expression: `df.filter(regex='regex')`

```python
# Select all columns containing 'Age'
age_related_columns = df.filter(regex='Age')
print(age_related_columns)
```

6. Randomly select n rows of data: `df.sample(n)`

```python
# Randomly select 2 rows of data
sample_df = df.sample(2)
print(sample_df)
```

### 3. Data Sorting

1. Sort the `DataFrame` according to the values of the specified column:

```python
DataFrame.sort_values(by, axis=0, ascending=True, inplace=False, kind='quicksort', na_position='last')
```

Parameter explanation:

- `by`: The name of the column or list of column names to sort by.
- `axis`: The axis to sort on, 0 for row-wise, 1 for column-wise.
- `ascending`: Whether to sort in ascending order, default is True.
- `inplace`: Whether to modify the original DataFrame, default is False.
- `kind`: Sorting algorithm, commonly used are 'quicksort', 'mergesort', 'heapsort'.
- `na_position`: Specifies the position of missing values during sorting, 'first' means at the beginning, 'last' means at the end.

```python
import pandas as pd

# Create a DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 28]}
df = pd.DataFrame(data)

# Sort by 'Age' column in ascending order
df_sorted_by_age = df.sort_values('Age')
print(df_sorted_by_age)

# Sort by 'Name' column in descending order
df_sorted_by_name_desc = df.sort_values('Name', ascending=False)
print(df_sorted_by_name_desc)

# Sort by multiple columns, 'Age' in ascending order, 'Name' in descending order
df_sorted_multi = df.sort_values(['Age', 'Name'], ascending=[True, False])
print(df_sorted_multi)
```

2. Sort according to the index

```python
DataFrame.sort_index(axis=0, ascending=True, inplace=False, kind='quicksort', na_position='last')
```

Parameter explanation:

- `axis`: The axis to sort on, 0 for row-wise, 1 for column-wise.
- `ascending`: Whether to sort in ascending order, default is True.
- `inplace`: Whether to modify the original DataFrame, default is False.
- `kind`: Sorting algorithm, commonly used are 'quicksort', 'mergesort', 'heapsort'.
- `na_position`: Specifies the position of missing values during sorting, 'first' means at the beginning, 'last' means at the end.

```python
# Create a DataFrame with string index
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data, index=['c', 'a', 'b'])

# Sort by index in ascending order
df_sorted_by_index = df.sort_index()
print(df_sorted_by_index)
```

### 4. Data Grouping and Aggregation

1. Group data according to the specified column: `df.groupby(column_name)`

```python
import pandas as pd

# Create a DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie', 'Alice'], 'Age': [25, 30, 28, 25], 'City': ['New York', 'Los Angeles', 'Chicago', 'New York']}
df = pd.DataFrame(data)

# Group by 'City' column
grouped = df.groupby('City')

# Calculate the average age for each group
print(grouped['Age'].mean())
```

2. Apply aggregation functions to grouped data: `df.aggregate({column_name:[function_name]})`

```python
# Calculate the mean and maximum value for the grouped result
print(grouped.aggregate({'Age': ['mean', 'max']}))
```

3. Generate a pivot table

```python
DataFrame.pivot_table(values, index, columns, aggfunc)
```

Parameter explanation:

- `values`: The column of values to aggregate.
- `index`: The column for the row index.
- `columns`: The column for the column index.
- `aggfunc`: The aggregation function.

```python
# Generate a pivot table, grouped by city and age, calculating the number of people in each group
pivot_table = df.pivot_table(values='Name', index='City', columns='Age', aggfunc='count')
print(pivot_table)
```

### 5. Data Merging

1. Merge multiple DataFrames by rows or columns: `pd.concat([df1, df2])`

```python
# Create two DataFrames
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})

# Merge by rows
df_concat_rows = pd.concat([df1, df2])
print(df_concat_rows)

# Merge by columns
df_concat_cols = pd.concat([df1, df2], axis=1)
print(df_concat_cols)
```

2. Merge two DataFrames based on a specified column, similar to a SQL JOIN operation: `pd.merge(df1, df2, on=column_name)`

```python
# Create two DataFrames with a common column 'Name'
df1 = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})
df2 = pd.DataFrame({'Name': ['Alice', 'Charlie'], 'City': ['New York', 'Chicago']})

# Merge by 'Name' column
df_merged = pd.merge(df1, df2, on='Name')
print(df_merged)
```

### 6. Data Selection and Filtering

1. Conditional filtering: `df[df['column_name'] > value]`

```python
# Select people older than 25
df_filtered = df[df['Age'] > 25]
print(df_filtered)
```

2. Use a string expression to select rows that meet the condition in the column: `df.query('column_name > value')`

```python
# Select people older than 25 and from New York
df_filtered = df.query('Age > 25 and City == "New York"')
print(df_filtered)
```

### 7. Others

| Function            | Description                         |
| ------------- | -------------------------- |
| df.describe() | Calculate basic statistical information, such as mean, standard deviation, minimum, maximum, etc. |
| df.mean()     | Calculate the mean value of each column. |
| df.median()   | Calculate the median of each column. |
| df.mode()     | Calculate the mode of each column. |
| df.count()    | Calculate the number of non-missing values in each column. |

Please note that due to the length of the content, the translation provided above may not be exhaustive. If you need further translation or have any specific sections you would like translated, feel free to let me know!


