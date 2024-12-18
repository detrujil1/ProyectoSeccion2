import bcrypt from "bcryptjs";
import encryptPassword from "../../middleware/ecrypt"; // Actualiza con la ruta correcta

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe("encryptPassword", () => {
  let nextMock;
  let context;

  beforeEach(() => {
    nextMock = jest.fn();
    context = {
      isModified: jest.fn(),
      password: "plainPassword",
    };
  });

  it("debería saltar la encriptación si la contraseña no ha sido modificada", async () => {
    context.isModified.mockReturnValue(false);

    await encryptPassword.call(context, nextMock);

    expect(context.isModified).toHaveBeenCalledWith("password");
    expect(nextMock).toHaveBeenCalled();
    expect(bcrypt.genSalt).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it("debería encriptar la contraseña si esta ha sido modificada", async () => {
    context.isModified.mockReturnValue(true);
    const mockSalt = "mockSalt";
    const mockHash = "mockHashedPassword";

    bcrypt.genSalt.mockResolvedValue(mockSalt);
    bcrypt.hash.mockResolvedValue(mockHash);

    await encryptPassword.call(context, nextMock);

    expect(context.isModified).toHaveBeenCalledWith("password");
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("plainPassword", mockSalt);
    expect(context.password).toBe(mockHash);
    expect(nextMock).toHaveBeenCalled();
  });

  it("debería manejar errores al generar el salt o el hash", async () => {
    context.isModified.mockReturnValue(true);
    const mockError = new Error("Error en bcrypt");

    bcrypt.genSalt.mockRejectedValue(mockError);

    await encryptPassword.call(context, nextMock);

    expect(nextMock).toHaveBeenCalledWith(mockError);
  });
});
