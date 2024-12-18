import productController from "../../controllers/productController.js";
import Product from "../../models/product.js";

// Mock del modelo Product
jest.mock("../../models/product.js");

describe("Product Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test para getAll
  describe("getAll", () => {
    it("debería retornar todos los productos activos", async () => {
      const mockProducts = [{ name: "Producto 1" }, { name: "Producto 2" }];
      Product.find.mockResolvedValue(mockProducts);

      await productController.getAll(req, res);

      expect(Product.find).toHaveBeenCalledWith({ deletedAt: null });
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it("debería manejar errores al obtener productos", async () => {
      Product.find.mockRejectedValue(new Error("Error de base de datos"));

      await productController.getAll(req, res);

      expect(console.log).toHaveBeenCalledWith(new Error("Error de base de datos"));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("Producto no encontrada");
    });
  });

  // Test para create
  describe("create", () => {
    it("debería crear un nuevo producto", async () => {
      req.body = {
        name: "Producto 1",
        size: "M",
        stock: 10,
        price: 100,
        category: "Ropa",
        brand: "Marca X",
        sku: "SKU123",
        description: "Un producto de prueba",
        images: ["img1.jpg", "img2.jpg"],
      };
      const mockProduct = { ...req.body, _id: "123" };

      Product.create.mockResolvedValue(mockProduct);

      await productController.create(req, res);

      expect(Product.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it("debería manejar errores al crear un producto", async () => {
      Product.create.mockRejectedValue(new Error("Error al crear producto"));

      await productController.create(req, res);

      expect(console.log).toHaveBeenCalledWith("Error al crear producto");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error en el servidor" });
    });
  });

  // Test para getById
  describe("getById", () => {
    it("debería retornar un producto por ID", async () => {
      req.params.id = "123";
      const mockProduct = { name: "Producto 1", _id: "123" };

      Product.findById.mockResolvedValue(mockProduct);

      await productController.getById(req, res);

      expect(Product.findById).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it("debería manejar errores al obtener producto por ID", async () => {
      req.params.id = "123";
      Product.findById.mockRejectedValue(new Error("Producto no encontrado"));

      await productController.getById(req, res);

      expect(console.log).toHaveBeenCalledWith(new Error("Producto no encontrado"));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("Producto no encontrada");
    });
  });

  // Test para update
  describe("update", () => {
    it("debería actualizar un producto existente", async () => {
      const mockProduct = {
        save: jest.fn(),
        name: "Old Name",
        size: "M",
        stock: 10,
      };
      req.params.id = "123";
      req.body = { name: "New Name" };

      Product.findById.mockResolvedValue(mockProduct);

      await productController.update(req, res);

      expect(Product.findById).toHaveBeenCalledWith("123");
      expect(mockProduct.name).toBe("New Name");
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("El producto ha sido actualizado");
    });

    it("debería manejar el caso de producto no encontrado", async () => {
      req.params.id = "123";
      Product.findById.mockResolvedValue(null);

      await productController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("No existe un producto con el ID mencionado");
    });
  });

  // Test para deleteProduct
  describe("deleteProduct", () => {
    it("debería marcar un producto como eliminado", async () => {
      const mockProduct = { save: jest.fn() };
      req.params.id = "123";

      Product.findById.mockResolvedValue(mockProduct);

      await productController.deleteProduct(req, res);

      expect(Product.findById).toHaveBeenCalledWith("123");
      expect(mockProduct.deletedAt).toBeDefined();
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("el producto se ha eliminado");
    });

    describe("deleteProduct", () => {
        it("debería manejar errores al eliminar un producto", async () => {
          Product.findById.mockRejectedValue(new Error("Error al eliminar producto"));
      
          await productController.deleteProduct(req, res);
      
          expect(console.log).toHaveBeenCalledWith("se cayo el sistmea");
          expect(res.status).toHaveBeenCalledWith(500); // Ahora esto debe pasar
          expect(res.json).toHaveBeenCalledWith("Error al eliminar producto");
        });
      });
      
  });
});
