import { validate } from 'class-validator';

export async function collectErrors(object) {
  const errors = await validate(object);
  if (errors.length > 0) {
    const errorPropertyMap = {};
    errors.forEach((error) => {
      errorPropertyMap[error.property] = Object.values(error.constraints);
    });
    return errorPropertyMap;
  } else {
    return {};
  }
}