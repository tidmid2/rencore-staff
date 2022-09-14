import API from "api/axios.config";

class DocumentService {
  getAllData(page, limit) {
    return API.get(`/document/?page=${page}`);
  }
}

export default new DocumentService();