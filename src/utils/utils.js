export const getDescription = (slug, categories) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].slug === slug) {
      return categories[i].description;
    }
  }
};

const arr = [];
for (let i = 1; i <= 20; i++) {
  arr.push(i);
}

export const numArr = arr;
