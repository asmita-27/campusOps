import React, { useState } from 'react';
import './ImageServices.css';

function ImageServices() {
  const [activeService, setActiveService] = useState('caption');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      // TODO: Replace with actual API endpoint
      const endpoint = activeService === 'caption' 
        ? 'http://localhost:8000/caption-images'
        : 'http://localhost:8000/ocr-images';

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || `Failed to process images with ${activeService} service`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="image-services" className="image-services-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-image me-2"></i>
              Image Services
            </h2>
            <p className="lead">
              Extract captions or text from images using advanced AI vision models
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                {/* Service Selection */}
                <div className="mb-4">
                  <div className="btn-group w-100" role="group" aria-label="Image service selection">
                    <button
                      type="button"
                      className={`btn ${activeService === 'caption' ? 'btn-info' : 'btn-outline-info'}`}
                      onClick={() => setActiveService('caption')}
                    >
                      <i className="fas fa-camera me-2"></i>
                      Image Captioning
                    </button>
                    <button
                      type="button"
                      className={`btn ${activeService === 'ocr' ? 'btn-info' : 'btn-outline-info'}`}
                      onClick={() => setActiveService('ocr')}
                    >
                      <i className="fas fa-text-width me-2"></i>
                      OCR (Text Extraction)
                    </button>
                  </div>
                </div>

                {/* Service Description */}
                <div className="alert alert-info mb-4">
                  <i className="fas fa-info-circle me-2"></i>
                  {activeService === 'caption' ? (
                    <span>
                      <strong>Image Captioning:</strong> Uses Groq vision models to generate 
                      factual descriptions of your event images.
                    </span>
                  ) : (
                    <span>
                      <strong>OCR Service:</strong> Extracts and cleans text from images 
                      using Tesseract OCR with AI-powered corrections.
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Image Upload */}
                  <div className="form-group mb-4">
                    <label htmlFor="imageFiles" className="form-label fw-bold">
                      <i className="fas fa-images me-2"></i>
                      Upload Images
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageFiles"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                    />
                    <small className="form-text text-muted">
                      {activeService === 'caption' 
                        ? 'Upload event photos to generate descriptive captions'
                        : 'Upload images containing text to extract content'
                      }
                    </small>
                    {images.length > 0 && (
                      <div className="mt-3">
                        <span className="badge">
                          <i className="fas fa-check-circle me-2"></i>
                          {images.length} {images.length === 1 ? 'image' : 'images'} selected
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Preview Images */}
                  {images.length > 0 && (
                    <div className="mb-4">
                      <label className="form-label fw-bold">Preview:</label>
                      <div className="preview-grid">
                        {images.slice(0, 5).map((image, index) => (
                          <div key={index} className="preview-item">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="img-fluid"
                            />
                          </div>
                        ))}
                        {images.length > 5 && (
                          <div className="more-indicator">
                            <span>+{images.length - 5}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-info btn-lg"
                      disabled={loading || images.length === 0}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Processing Images...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-cogs me-2"></i>
                          {activeService === 'caption' ? 'Generate Captions' : 'Extract Text'}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Error Display */}
                {error && (
                  <div className="alert alert-danger mt-4" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Results Display */}
                {results && (
                  <div className="mt-5">
                    <div className="alert alert-success" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Processing completed successfully!
                    </div>
                    <div className="card mt-4">
                      <div className="card-header">
                        <h5 className="mb-0 text-white">
                          {activeService === 'caption' ? 'Generated Captions' : 'Extracted Text'}
                        </h5>
                      </div>
                      <div className="card-body p-0">
                        <pre className="bg-light p-4 rounded-3 m-0">
                          {JSON.stringify(results, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageServices;