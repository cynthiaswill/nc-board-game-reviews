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

export const urlRegex =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export const filterReviewsByAuthor = (reviews, author) => {
  return reviews.filter((review) => review.owner === author);
};

export const setVisibility = (isButtonDisabled) => {
  return isButtonDisabled ? "hidden" : "visible";
};

export const particleOptions = {
  fpsLimit: 30,
  particles: {
    links: {
      enable: true,
      distance: 60,
    },
    move: {
      enable: true,
      speed: 0.5,
      outModes: {
        default: "bounce",
      },
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: 40,
    },
    size: {
      random: true,
      value: 4,
    },
  },
};
