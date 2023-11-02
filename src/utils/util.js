import fs from "fs";

export function parseQueryConditions(query) {
  if (query) {
    return query.split("&").map((condition) => {
      const data = condition.split("=");
      return { key: data[0], value: decodeURIComponent(data[1]) };
    });
  }
}

// Lọc theo điều kiện
export function filterDataByConditions(dataArray, conditions) {
  if (conditions) {
    return dataArray.filter((data) => {
      return conditions.find(
        (condition) => condition.value == data[condition.key]
      );
    });
  }
}

// Lấy Dữ liệu
export function getData(resource) {
  try {
    const jsonData = fs.readFileSync(`./src/models/${resource}.json`, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error("Lỗi JSON");
  }
}

// Tạo Dữ liệu
export function insertData(resource, item) {
  try {
    const jsonData = fs.readFileSync(`./src/models/${resource}.json`, "utf8");
    const data = JSON.parse(jsonData);
    data.push(item);
    fs.writeFileSync(`./src/models/${resource}.json`, JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error("Lỗi JSON");
  }
}

// Xóa Dữ liệu
export function deleteData(resource, id) {
  try {
    const jsonData = fs.readFileSync(`./src/models/${resource}.json`, "utf8");
    const data = JSON.parse(jsonData);
    const categoryDelete = data.filter((category) => {
      return category.id != id;
    });
    fs.writeFileSync(
      `./src/models/${resource}.json`,
      JSON.stringify(categoryDelete)
    );
    return categoryDelete;
  } catch (error) {
    throw new Error("Lỗi JSON");
  }
}

// Sửa Dữ liệu
export function editData(resource, id, item) {
  try {
    const jsonData = fs.readFileSync(`./src/models/${resource}.json`, "utf8");
    const data = JSON.parse(jsonData);
    const categoryEditData = data.map((category) => {
      if (category.id === id) {
        const updatedCategoryData = { id, ...item };
        return updatedCategoryData;
      }
      return category;
    });
    fs.writeFileSync(
      `./src/models/${resource}.json`,
      JSON.stringify(categoryEditData)
    );
    return categoryEditData;
  } catch (error) {
    throw new Error("Lỗi JSON");
  }
}
