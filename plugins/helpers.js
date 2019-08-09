import slugify from 'slugify'

export const slugString = (str) => {
  if (!str) return ''
  return slugify(str, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true
  });
}
