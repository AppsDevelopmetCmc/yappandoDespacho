export const recuperar = (nombre, fnPintarImagen) => {
  let referenciaStorage = global.storage.refFromURL(
    "gs://little-market-dev-377b6.appspot.com/images/" + nombre
  );
  referenciaStorage
    .getDownloadURL()
    .then((data) => {
      let urlDescarga = data;
      fnPintarImagen(urlDescarga);
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
};
