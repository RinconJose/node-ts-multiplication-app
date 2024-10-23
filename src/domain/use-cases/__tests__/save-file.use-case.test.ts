import fs from 'fs';
import { SaveFile } from '../save-file.use-case';
import { de, fi, mk } from 'date-fns/locale';


describe('SaveFileUseCase', () => {

    // Scope de las pruebas
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.tsx`;

    // ciclos de vida de las pruebas
    afterEach(() => {
        // clean up
        // Eliminar archivos creados
        const outputFolderExists = fs.existsSync('outputs');
        if(outputFolderExists) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if(customOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save file with default value', () => {
        // Sujeto de prueba y estado inicial
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.tsx';
        const options = {
            fileContent: 'test content'
        }

        // Estímulo
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        // Acersiones
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe( options.fileContent )
    });

    test('should save file with cudtom values', () => {
        // Sujeto de prueba y estado inicial
        const saveFile = new SaveFile();

        // Estímulo
        const result = saveFile.execute(customOptions);
        const fileExixts = fs.existsSync(customFilePath)
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        // Acersiones
        expect( result ).toBeTruthy();
        expect( fileExixts ).toBeTruthy();
        expect( fileContent ).toBe( customOptions.fileContent );
    })

    test('should return false if directory could not be created', () => {

        // Sujeto de prueba y estado inicial
        const saveFile = new SaveFile();

        // Estímulo
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        const result = saveFile.execute(customOptions);

        // Acersiones
        expect( result ).toBeFalsy();

        // Limpiar los mocks cuando se usa el método jest.spyOn().mockImplementation()
        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        // Sujeto de prueba y estado inicial
        const saveFile = new SaveFile();

        // Estímulo
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message') }
        );
        const result = saveFile.execute({fileContent:'hola'});

        // Acersiones
        expect( result ).toBe( false );

        // Limpiar los mocks cuando se usa el método jest.spyOn().mockImplementation()
        writeFileSpy.mockRestore();

    });
});


// Explicación de la prueba
// jest.spyOn(fs, 'mkdirSync') cuando uno hace una espiación de esta manera, se puede saber si fue llamada la función mkdirSync y si fue llamada con los argumentos correctos, etc.
// jest.spyOn(fs, 'mkdirSync').mockImplementation cuando se agrega el mockImplementation, quiere decir que vamos a reemplazar la función mkdirSync por una función que nosotros definamos, en este caso, una función que lanza un error.