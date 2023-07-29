// // Selecione o nó que será observado
// const targetNode = document.querySelector('body');

// // Opções do observador (quais mutações obserconst)
// const config = { childList: true, subtree: true };

// // Função de callback a ser executada quando as mutações são observadas
// const callback = function (mutationsList: any, observer: any) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       for (let node of mutation.addedNodes) {
//         if (node.nodeType === Node.ELEMENT_NODE) {
//           // Crie o evento personalizado
//           const event = new CustomEvent('onMount', { detail: { node }});
          
//           // Dispare o evento
//           window.dispatchEvent(event);
//         }
//       }
//     }
//   }
// };

// // Crie uma instância do observador com a função de callback
// const observer = new MutationObserver(callback);

// // Comece a obserconst o nó de destino com as configurações de configuração
// observer.observe(targetNode as HTMLBodyElement, config);

// // Adicione o listener para o evento personalizado 'onMount'
// window.addEventListener('onMount', function (e: any) {
//   const node = e.detail.node;
//   if(node.onMount){
//     node.onMount(node) ;
//   }
//   // if (e.onMount) {
//   // }
// });


// // const dv = document.createElement("div");
// // dv.innerHTML = "Teste";
// // dv.onMount = (node: any) => {
// //   console.log("onMount", node);
// // }
// // document.body.appendChild(dv);

// // Posteriormente, você pode parar de obserconst
// // observer.disconnect();