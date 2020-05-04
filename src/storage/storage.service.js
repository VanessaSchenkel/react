export class StorageService {
	getString(chave) {
		return localStorage.getItem(chave);
	}

	setString(chave, valor) {
		localStorage.setItem(chave, valor);
	}
}
