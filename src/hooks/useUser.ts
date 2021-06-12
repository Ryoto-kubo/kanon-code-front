// import React, { useCallback, useEffect, useState } from "react";

// export const useUser = () => {

//   useEffect(() => {
//     const err = new Error();
//     (async () => {
//       try {
//         const response = await getUser(params);
//         const result = response.data;
//         if (!result.status) throw (err.message = result.status_message);
//         setProfile(result.Item.user_profile);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error);
//         alert(error);
//       }
//     })();
//   }, []);
// }
