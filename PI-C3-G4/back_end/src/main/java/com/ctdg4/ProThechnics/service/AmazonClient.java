/*
package com.ctdg4.ProThechnics.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AmazonClient {

    @Autowired
    private Environment env;
    private AmazonS3 s3client;
    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;

//    @Value("${amazonProperties.accessKey}")
//    private String accessKey;
//    @Value("${amazonProperties.secretKey}")
//    private String secretKey;

    @PostConstruct

    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(
                env.getProperty("AWS_ACCESS_KEY_ID"),
                env.getProperty("AWS_SECRET_ACCESS_KEY")
        );
        this.s3client = new AmazonS3Client(credentials);
    }

    // One file
    public String uploadFile(MultipartFile multipartFile) {
        String fileUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
            uploadFileTos3bucket(fileName, file);
            file.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileUrl;
    }

    // Multiple files
    public List<String> uploadFiles(List<MultipartFile> multipartFiles, String folder) {
        List<String> fileUrls = new ArrayList<>();
        try {
            for (MultipartFile multipartFile : multipartFiles) {
                File file = convertMultiPartToFile(multipartFile);
                String fileName = generateFileName(multipartFile);
                String fileUrl = endpointUrl + "/" + bucketName + "/" + folder + "/" + fileName;
                uploadFileTos3bucket(folder + "/" + fileName, file);
                fileUrls.add(fileUrl);
                file.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileUrls;
    }

    public String deleteFileFromS3Bucket(String fileUrl) {
        String[] parts = fileUrl.split("/");
        String folder = parts[parts.length - 2];
        String fileName = parts[parts.length - 1];
        String objectKey = folder + "/" + fileName;
        s3client.deleteObject(new DeleteObjectRequest(bucketName, objectKey));

        return "Successfully deleted";
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return multiPart.getOriginalFilename().replace(" ", "_");
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        s3client.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }
}
*/
