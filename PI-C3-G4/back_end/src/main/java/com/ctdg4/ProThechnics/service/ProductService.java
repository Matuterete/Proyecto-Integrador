package com.ctdg4.ProThechnics.service;

import com.ctdg4.ProThechnics.dto.CategoryDTO;
import com.ctdg4.ProThechnics.dto.FeatureDTO;
import com.ctdg4.ProThechnics.dto.ProductDTO;
import com.ctdg4.ProThechnics.dto.ProductImageDTO;
import com.ctdg4.ProThechnics.entity.*;
import com.ctdg4.ProThechnics.exception.ResourceNotFoundException;
import com.ctdg4.ProThechnics.repository.*;
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
    private CategoryRepository categoryRepository;
    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductFeatureRepository productFeatureRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Product saveProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        Category category = categoryRepository.findById(savedProduct.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        savedProduct.setCategory(category);
        return savedProduct;
    }

    public Product updateProduct(Product product) throws ResourceNotFoundException {

        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + product.getId()));

        existingProduct.setIsActive(product.getIsActive());
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());

        if (product.getCategory() != null) {

            existingProduct.setCategory(product.getCategory());
        }

//
//        List<Feature> existingFeatures = product.getFeatures();
//        if (existingFeatures != null) {
//            for (Feature existingFeature : existingFeatures) {
//                Optional<Feature> optionalFeature = featureRepository.findById(existingFeature.getId());
//                if (optionalFeature.isPresent()) {
//                    existingFeature.setProductFeatures(optionalFeature.get().getProductFeatures());
//                }
//
//                List<ProductFeature> productFeaturesToUpdateOrDelete = existingFeature.getFeatures();
//                if (productFeaturesToUpdateOrDelete != null) {
//                    for (ProductFeature productFeature : productFeaturesToUpdateOrDelete) {
//                        // Verificar si la asociación existe en la base de datos
//                        Optional<ProductFeature> optionalProductFeature = productFeatureRepository.findById(productFeature.getId());
//                        if (optionalProductFeature.isPresent()) {
//                            // La asociación existe, actualizarla si es necesario
//                            ProductFeature dbProductFeature = optionalProductFeature.get();
//                            dbProductFeature.setFeatureValue(productFeature.getFeatureValue());
//                            // Actualizar otros campos según sea necesario
//
//                            // Guardar la asociación actualizada
//                            productFeatureRepository.save(dbProductFeature);
//                        } else {
//                            // La asociación no existe en la base de datos, eliminarla
//                            existingFeature.getProductFeatures().remove(productFeature);
//                            productFeatureRepository.delete(productFeature);
//                        }
//                    }
//                }
//            }

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long product_id) {
        productRepository.deleteById(product_id);
    }

    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> findProductById(Long product_id) {
        return productRepository.findById(product_id);
    }

    public void addFeature(Long productId, Long featureId, String featureValue) {
        productFeatureRepository.addFeature(productId, featureId, featureValue);
    }

    public void removeFeature(Long productId, Long featureId) {
        productFeatureRepository.removeFeature(productId, featureId);
    }

    public void updateFeatureValue(Long productId, Long featureId, String featureValue) {
        productFeatureRepository.updateFeatureValue(productId, featureId, featureValue);
    }

    //DTO for Listing All
    public List<ProductDTO> findAllProductDTOs() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapToDTOOnlyWithPrimaryImages)
                .collect(Collectors.toList());
    }

    ProductDTO mapToDTOOnlyWithPrimaryImages(Product product) {

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

    //DTO for Category search
    public List<ProductDTO> findProductByCategoryIdWithEverything(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
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
    public void updateProduct(Long productId, Product product) throws ResourceNotFoundException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Update fields of existingProduct with the values from product
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setImages(product.getImages());
        existingProduct.setFeatures(product.getFeatures());

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
