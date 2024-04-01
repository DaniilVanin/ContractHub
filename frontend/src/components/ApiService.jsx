import SendFormUI from "./SendFormUI";
import TableUI from "./TableUI";
import SearchTab from "./SearchTab"
import SendFormForEditUI from "./SendFormForEditUI";


import { toast } from 'react-toastify';

export default class APIService{

	static async ApiConnectGet(link){
		const requestOptions = {
			method: 'GET',
			headers : {
			  'Content-Type':'application/json',
			  'Authorization':`Bearer ${localStorage.getItem('token')}`

		  },
		};
		const responce = await fetch(link,requestOptions);
		console.log(responce);
		const result  = await responce.json();
		return result
	}

	static async ApiConnectPost(link,bodyz){
		const requestOptions = {
			method: 'POST',
			headers : {
			  'Content-Type':'application/json',
			  'Authorization':`Bearer ${localStorage.getItem('token')}`
		  },
			body: JSON.stringify({god: bodyz})
		};
		const responce = await fetch(link,requestOptions);
		const result  = await responce.json();
		return result
	}

	static async ApiConnectPostAndGetFile(link,bodyz){
		const requestOptions = {
			method: 'POST',
			headers : {
				'Content-Type':"application/json",
			  'Authorization':`Bearer ${localStorage.getItem('token')}`
		  },
			body: JSON.stringify({god: bodyz})
		};
		const responce = await fetch(link,requestOptions);

		if (responce.status === 200){
			const jsonchik = await responce.blob()
			toast("Успешно")
			const result  = await jsonchik
			return result
		} else{
			const jsonchik = await responce.json()
			toast(jsonchik.status_message)
			return undefined
		}
	}

	static async ApiConnectPostAuth(link, email, password){
		const requestOptions = {
			method: 'POST',
			headers : {
			  'Content-Type':'application/json'
		  },
			body: JSON.stringify({email: email, password: password})
		};
		const responce = await fetch(link,requestOptions);
		const result  = await responce.json();
		return result
	}

	static async SendID(body){
		this.result = await this.ApiConnectPostAndGetFile("/api/getFile",body);
		return (this.result)

	}
	static async GetTable(body){
		this.result = await this.ApiConnectGet("/api/getTable",body);
		toast(this.result)
		return (TableUI(this.result))
	}
	static async GetTableHeader(body){
		this.result = await this.ApiConnectGet("/api/getTable",body);
		toast(this.result)
		return (SearchTab(this.result))
	}
	static async GetTableSearch(body){
		this.result = await this.ApiConnectPost("/api/getDataSearch",body);
		toast(this.result)
		return (TableUI(this.result))
	}
	static async GetUIInputForm(body){
		this.result = await this.ApiConnectGet("/api/getTable",body);
		toast(this.result)
		return (SendFormUI(this.result))
	} 
	static async GetUIInputFormForEdit(body){
		this.result = await this.ApiConnectPost("/api/getDataSearch",body);
		toast(this.result)
		console.log(this.result)
		return (SendFormForEditUI(this.result))
	} 
	static async CreateEntity(body){
		this.result = await this.ApiConnectPost("/api/createEntity",body);
		toast(this.result.status_message)
		console.log(this.result)
		return (this.result)
	}
	static async UpdateEntity(body){
		this.result = await this.ApiConnectPost("/api/updateEntity",body);
		toast(this.result.status_message)
		console.log(this.result)
		return (this.result)
	}
	static async SendIDforDelete(body){
		this.result = await this.ApiConnectPost("/api/deleteEntity",body);
		toast(this.result.status_message)
		console.log(this.result)
		return (this.result)
	}
}