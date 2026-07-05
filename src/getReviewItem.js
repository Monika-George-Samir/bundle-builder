
    function getReviewItems(steps) {
     const items = [];
// console.log(steps);

     for (const step of steps) {
        for (const product of step.products) {
            if ( product.variants && product.variants.length > 0 ) {
                for (const variant of product.variants) {
                    if (variant.quantity > 0) {
                        items.push({
                            ...product,
                            ...variant,
                            stepId: step.id,
                            productId:product.id,
                            variantId: variant.id,
                            priceLabel: product.priceLabel || '',
                            image:variant.image || product.image,
                            required: product.required || false,
                        })
                    }
                }
            }else if(product.quantity > 0){
                items.push({
                    ...product,
                    stepId:step.id,
                    productId: product.id,
                    variantId: null,
                    required: product.required || false,
                    name: product.name,
                    
                })
            }
        }
     }

    //  console.log(items);
     return items;
     
    }

    export default getReviewItems;