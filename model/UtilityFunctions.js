export const PersistData = (Mykey, data) => {
  global.storage.save({
    key: Mykey, // Note: Do not use underscore("_") in key!
    data: {
      isAvailable: true,
      storeData: data,
    },

    // if not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    expires: null,
  });
};
// export const PersistData = (Mykey, data) => {
//   new Promise((resolve, reject) => {
//     global.storage.save({
//       key: Mykey, // Note: Do not use underscore("_") in key!
//       data: {
//         isAvailable: true,
//         storeData: data,
//       },

//       // if not specified, the defaultExpires will be applied instead.
//       // if set to null, then it will never expire.
//       expires: null,
//     })
//       .catch((err) => {
//         // any exception including data not found
//         // goes to catch()
//         console.warn(err.message);
//         switch (err.name) {
//           case "NotFoundError":
//             // alert("You have not register before")
//             resolve([]);
//             break;
//           case "ExpiredError":
//             // TODO
//             resolve([]);
//             break;
//         }
//       });
// };
export const GetHRId = () => {
  return 1;
};

export const GetPersistData = (key) =>
  new Promise((resolve, reject) => {
    global.storage
      .load({
        key: key,
      })
      .then((ret) => {
        // resolve(ret);

        if (ret.isAvailable === true) {
          let storeData = ret.storeData;

          resolve(storeData);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // alert("You have not register before")
            resolve([]);
            break;
          case "ExpiredError":
            // TODO
            resolve([]);
            break;
        }
      });
  });
