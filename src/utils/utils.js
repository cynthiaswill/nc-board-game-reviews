export const getDescription = (slug, categories) => {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].slug === slug) {
      return categories[i].description;
    }
  }
};
