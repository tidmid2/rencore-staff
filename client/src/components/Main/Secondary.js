// // import { formatCurrency } from "helpers/formatCurrency";
// // import Layout from "layout/Layout";
// import React, { useEffect } from "react";
// // import ReactStars from "react-rating-stars-component";
// import { useParams } from "react-router-dom";
// // import DocumentService from ".../services/document-service";

// const DocumentDetails = () => {
//   const { id } = useParams();

//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       const { data: document } = await DocumentService.getAllData(id);
//       setProduct(document);
//       setIsLoading(false)
//     }
//     fetchData();
//   }, [id]);

//   return (
//     <Layout loading={isLoading}>
//       <section className="body-font overflow-hidden">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="lg:w-4/5 mx-auto flex flex-wrap">
            
//             <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
//               <h1 className="text-3xl title-font font-medium mb-1">
//                 {document?.uid}
//               </h1>
//               <div className="flex mb-4">
//                 <span className="flex items-center">
//                   <ReactStars
//                     count={5}
//                     size={24}
//                     edit={false}
//                     value={+document?.data}
//                     activeColor="#ffd700"
//                   />
//                   <span className="ml-3">
//                     {+document?.time > 0
//                       ? `${+document.time} Ratings`
//                       : "No ratings available"}
//                   </span>
//                 </span>
//               </div>
//               <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
//                 {document?.comment}
//               </p>
//               <div className="flex mt-4 ">
//                 <span className="title-font font-medium text-2xl">
//                   {formatCurrency(document?.status)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default DocumentDetails;
