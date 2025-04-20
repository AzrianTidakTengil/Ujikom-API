const CryptoJS = require('crypto-js');

const secretKey = process.env.SECRET;

function encrypt(text) {
  const ciphertext = CryptoJS.AES.encrypt(text.toString(), secretKey).toString();
  return ciphertext;
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

function encryptProductDeep(product) {
  const productJson = product.toJSON();

  // Encrypt main product ID
  productJson.id = encrypt(productJson.id.toString());

  // Encrypt Images
  if (Array.isArray(productJson.productToImage)) {
    productJson.productToImage = productJson.productToImage.map(img => {
      img.id = encrypt(img.id.toString());
      return img;
    });
  }

  // Encrypt Variants
  if (Array.isArray(productJson.productToProductVariant)) {
    productJson.productToProductVariant = productJson.productToProductVariant.map(variant => {
      variant.id = encrypt(variant.id.toString());
      return variant;
    });
  }

  // Encrypt Owner + Store
  if (productJson.productToOwner) {
    productJson.productToOwner.id = encrypt(productJson.productToOwner.id.toString());

    if (productJson.productToOwner.ownerToStore) {
      productJson.productToOwner.ownerToStore.id = encrypt(productJson.productToOwner.ownerToStore.id.toString());
    }
  }

  return productJson;
}

function encryptTransactionDeep(transaction) {
  const json = transaction.toJSON();

  // Encrypt top-level transaction ID
  json.id = encrypt(json.id.toString());

  // Encrypt Payment
  if (json.transactionToPayment) {
    json.transactionToPayment.id = encrypt(json.transactionToPayment.id.toString());
  }

  // Encrypt Trolley and nested stuff
  if (Array.isArray(json.transactionToTrolley)) {
    json.transactionToTrolley = json.transactionToTrolley.map(trolley => {
      trolley.id = encrypt(trolley.id.toString());
      trolley.product_id = encrypt(trolley.product_id.toString());

      // Encrypt Product
      if (trolley.trolleyToProduct) {
        const product = trolley.trolleyToProduct;
        product.id = encrypt(product.id.toString());

        // Encrypt Owner and Store
        if (product.productToOwner) {
          product.productToOwner.id = encrypt(product.productToOwner.id.toString());
          if (product.productToOwner.ownerToStore) {
            product.productToOwner.ownerToStore.id = encrypt(product.productToOwner.ownerToStore.id.toString());
          }
        }

        // Encrypt Images
        if (Array.isArray(product.productToImage)) {
          product.productToImage = product.productToImage.map(img => {
            img.id = encrypt(img.id.toString());
            return img;
          });
        }

        // Encrypt Variants
        if (Array.isArray(product.productToProductVariant)) {
          product.productToProductVariant = product.productToProductVariant.map(variant => {
            variant.id = encrypt(variant.id.toString());

            if (variant.productVariantToVariant) {
              variant.productVariantToVariant.id = encrypt(variant.productVariantToVariant.id.toString());
            }

            if (Array.isArray(variant.productVariantToSubVariant)) {
              variant.productVariantToSubVariant = variant.productVariantToSubVariant.map(sub => {
                sub.id = encrypt(sub.id.toString());

                if (sub.subVariantTosubVariant) {
                  sub.subVariantTosubVariant.id = encrypt(sub.subVariantTosubVariant.id.toString());
                }

                return sub;
              });
            }

            return variant;
          });
        }

        // Encrypt ProductCategory & related
        if (product.productToCategory) {
          const cat = product.productToCategory;
          cat.id = encrypt(cat.id.toString());

          if (cat.productCategoryToCategory1) {
            cat.productCategoryToCategory1.id = encrypt(cat.productCategoryToCategory1.id.toString());
          }
          if (cat.productCategoryToCategory2) {
            cat.productCategoryToCategory2.id = encrypt(cat.productCategoryToCategory2.id.toString());
          }
          if (cat.productCategoryToCategory3) {
            cat.productCategoryToCategory3.id = encrypt(cat.productCategoryToCategory3.id.toString());
          }
        }
      }

      return trolley;
    });
  }

  return json;
}

module.exports = {
  encrypt,
  decrypt,
  encryptProductDeep,
  encryptTransactionDeep,
};