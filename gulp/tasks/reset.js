import del from 'del' // чистка папки dist

export const reset = () => {
  return del(app.path.clean)
}
