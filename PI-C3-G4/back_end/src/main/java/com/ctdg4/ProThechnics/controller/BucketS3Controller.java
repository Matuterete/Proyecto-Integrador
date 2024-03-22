package com.ctdg4.ProThechnics.controller;

import com.ctdg4.ProThechnics.service.AmazonClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/storage")
@CrossOrigin(origins = "*")
@Tags(value = { @Tag(name = "Storage") })
public class BucketS3Controller {
    private AmazonClient amazonClient;
    @Autowired
    BucketS3Controller(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    @Operation(summary = "Upload files to a specific folder in Amazon S3 bucket",
            description = "Uploads files to a specific folder in the configured Amazon S3 bucket.")
    @ApiResponse(responseCode = "200", description = "Files uploaded successfully",
            content = @Content(schema = @Schema(implementation = List.class)))
    @PostMapping("/{folder}/uploadFiles")
    public ResponseEntity<?> uploadMultipleFiles(@RequestParam("files") List<MultipartFile> files,
                                                 @PathVariable("folder") String folder) {
        List<String> fileUrls = amazonClient.uploadFiles(files, folder);
        return ResponseEntity.ok().body(fileUrls);
    }

    @Operation(summary = "Delete a file from Amazon S3 bucket",
            description = "Deletes a file from the configured Amazon S3 bucket.")
    @ApiResponse(responseCode = "200", description = "File deleted successfully")
    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }
}
