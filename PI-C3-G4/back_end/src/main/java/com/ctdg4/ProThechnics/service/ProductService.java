package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.dto.CategoryDTO;
import com.ctdg4.ProThechnics.dto.FeatureDTO;
import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.dto.ProductImageDTO;
import com.ctdg4.ProThechnics.entity.Category;
import com.ctdg4.ProThechnics.entity.Feature;
import com.ctdg4.ProThechnics.entity.Product;
import com.ctdg4.ProThechnics.entity.ProductFeature;
import com.ctdg4.ProThechnics.entity.ProductImage;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.repository.ProductFeatureRepository;
import com.ctdg4.ProThechnics.repository.ProductImageRepository;
import com.ctdg4.ProThechnics.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductFeatureRepository productFeatureRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Products
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

//    public void updateProduct(Product product) {
//        productRepository.save(product);
//    }

    public void deleteProduct(Long product_id) {
        productRepository.deleteById(product_id);
    }

    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> findProductById(Long product_id) {
        return productRepository.findById(product_id);
    }

    //DTO for Listing All
    public List<ProductDTO> findAllProductDTOs() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapToDTOOnlyWithPrimaryImages)
                .collect(Collectors.toList());
    }

    private ProductDTO mapToDTOOnlyWithPrimaryImages(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        CategoryDTO categoryDTO = mapToDTO(product.getCategory());
        productDTO.setCategory(categoryDTO);

        List<ProductImage> primaryImages = product.getImages().stream()
                .filter(ProductImage::isPrimary)
                .collect(Collectors.toList());

        List<ProductImageDTO> imageDTOs = primaryImages.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        productDTO.setFeatures(null);

        productDTO.setImages(imageDTOs);
        return productDTO;
    }

    //DTO for ID search
    public Optional<ProductDTO> findProductByIdWithEverything(Long product_id) {
        Optional<Product> optionalProduct = productRepository.findById(product_id);
        return optionalProduct.map(this::mapProductToDTOWithFeatures);
    }

    public ProductDTO mapProductToDTOWithFeatures(Product product) {
        ProductDTO productDTO = mapToDTO(product);

        List<ProductImageDTO> imageDTOs = product.getImages().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        CategoryDTO categoryDTO = mapToDTO(product.getCategory());

        List<ProductFeature> productFeatures = productFeatureRepository.findByProduct(product);
        List<FeatureDTO> featureDTOs = productFeatures.stream()
                .map(productFeature -> {
                    FeatureDTO featureDTO = mapToDTO(productFeature.getFeature());
                    featureDTO.setFeatureValue(productFeature.getFeatureValue());
                    return featureDTO;
                })
                .collect(Collectors.toList());

        productDTO.setImages(imageDTOs);
        productDTO.setCategory(categoryDTO);
        productDTO.setFeatures(featureDTOs);

        return productDTO;
    }

    //DTO for Name search
    public List<ProductDTO> findProductByNameWithEverything(String productName) {
        List<Product> products = productRepository.findByNameLike('%' + productName + '%');
        return products.stream()
                .map(this::mapToDTOOnlyWithPrimaryImages)
                .collect(Collectors.toList());
    }

    //DTO Mappers
    public ProductDTO mapToDTO(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }
    public FeatureDTO mapToDTO(Feature feature) {
        return modelMapper.map(feature, FeatureDTO.class);
    }
    public ProductImageDTO mapToDTO(ProductImage productImage) {
        return modelMapper.map(productImage, ProductImageDTO.class);
    }
    public CategoryDTO mapToDTO(Category category) {
        if (category == null) {
            return new CategoryDTO();
        }
        return modelMapper.map(category, CategoryDTO.class);
    }


    @Transactional
    public void updateProduct(Long productId, Product updatedProduct) throws ResourceNotFoundException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Update fields of existingProduct with the values from updatedProduct
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setImages(updatedProduct.getImages());
        existingProduct.setFeatures(updatedProduct.getFeatures());

        // Save the updated product
        productRepository.save(existingProduct);
    }
}
    //////////////////////////////// TODO DTO COMENTADO //////////////////////////////////////////
/*

    // Product + Images DTOs
    public List<ProductDTO> getAllProductsWithCategoriesAndPrimaryImage() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapProductToDTOFiltered)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductWithCategoryAndAllImages(Long productId) throws ResourceNotFoundException {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return mapProductToDTO(product);
        } else {
            throw new ResourceNotFoundException("Product with ID: " + productId + " not found. Please verify the product exists and try again.");
        }
    }

    private ProductDTO mapProductToDTOFiltered(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        if (product.getCategory() != null) {
            productDTO.setCategory(mapCategoryToDTO(product.getCategory()));
        } else {
            productDTO.setCategory(null);
        }

        List<ProductImage> productImages = getProductImagesForProduct(product);
        List<ProductImageDTO> productImageDTOs = productImages.stream()
                .filter(ProductImage::isPrimary)
                .map(this::mapProductImageToDTO)
                .collect(Collectors.toList());
        productDTO.setImages(productImageDTOs);

//        List<FeatureDTO> featureDTOs = mapFeaturesToDTO(product.getFeatures(), product);
//        productDTO.setFeatures(featureDTOs);

        return productDTO;
    }

    private ProductDTO mapProductToDTO(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        if (product.getCategory() != null) {
            productDTO.setCategory(mapCategoryToDTO(product.getCategory()));
        } else {
            productDTO.setCategory(null);
        }
        List<ProductImage> productImages = getProductImagesForProduct(product);
        List<ProductImageDTO> productImageDTOs = productImages.stream()
                .map(this::mapProductImageToDTO)
                .collect(Collectors.toList());
        productDTO.setImages(productImageDTOs);

//        List<FeatureDTO> featureDTOs = mapFeaturesToDTO(product.getFeatures(), product);
//        productDTO.setFeatures(featureDTOs);

        return productDTO;
    }

    private List<ProductImage> getProductImagesForProduct(Product product) {
        return productImageRepository.findByProduct(product);
    }

    private CategoryDTO mapCategoryToDTO(Category category) {
        return modelMapper.map(category, CategoryDTO.class);
    }

    private ProductImageDTO mapProductImageToDTO(ProductImage productImage) {
        return modelMapper.map(productImage, ProductImageDTO.class);
    }

    // FEATURES esto rompio todo
//    private FeatureDTO mapFeatureToDTO(Feature feature, String featureValue) {
//        FeatureDTO featureDTO = modelMapper.map(feature, FeatureDTO.class);
//        featureDTO.setFeatureValue(featureValue);
//        return featureDTO;
//    }
//
//    private List<FeatureDTO> mapFeaturesToDTO(List<Feature> features, Product product) {
//        List<FeatureDTO> featureDTOs = new ArrayList<>();
//        for (Feature feature : features) {
//            String featureValue = productFeatureRepository.findByProductAndFeature(product, feature)
//                    .map(ProductFeature::getFeatureValue)
//                    .orElse(null);
//            featureDTOs.add(mapFeatureToDTO(feature, featureValue));
//        }
//        return featureDTOs;
//    }
*/
//    public Optional<Product> findProductByIdWithFeatures(Long product_id) {
//        Optional<Product> optionalProduct = productRepository.findById(product_id);
//        optionalProduct.ifPresent(product -> {
//            List<ProductFeature> productFeatures = productFeatureRepository.findByProduct(product);
//            product.setFeaturesValue(productFeatures);
//        });
//        return optionalProduct;
//    }
