from classes.PruebaClass import PruebaClass
from flask import request
import datetime

PruebaClass = PruebaClass()

def manageLeads():
	response = {
		"result":0,
		"error":"",
		"data":{}
	}
	requ=request.get_json()
	if request.method == "POST":
		if requ.keys() >= {"firstName","lastName","phoneNumber","email","age","leadStatus","street","city","state","zipCode","country"}:
			insertData = {
				"firstName": requ["firstName"],
				"lastName": requ["lastName"],
				"phoneNumber": str(requ["phoneNumber"]),
				"email": requ["email"],
				"age": str(requ["age"]),
				"leadStatus": str(requ["leadStatus"]),
				"street": requ["street"],
				"city": requ["city"],
				"state": requ["state"],
				"zipCode": requ["zipCode"],
				"country": requ["country"]
			}
			if "aditionalInformation" in requ:
				insertData["aditionalInformation"] = requ["aditionalInformation"]
			insert = PruebaClass.insertTable("client",insertData)
			if insert != None:
				response["data"] = insert
				response["result"] = 1
			else:
				response["error"] = "Error: Insert Error MySQL"
		else:
			response["error"] = "Error: Not Parameter Found"
	elif request.method == "PUT":
		if requ.keys() >= {"firstName","lastName","phoneNumber","email","age","leadStatus","street","city","state","zipCode","country","idClient"}:
			client = PruebaClass.getSingleFromTable("client","idClient"," AND active = 1 AND idClient = " + str("idClient"))
			if client != None:
				updateData = {
					"firstName": requ["firstName"],
					"lastName": requ["lastName"],
					"phoneNumber": str(requ["phoneNumber"]),
					"email": requ["email"],
					"age": str(requ["age"]),
					"leadStatus": str(requ["leadStatus"]),
					"street": requ["street"],
					"city": requ["city"],
					"state": requ["state"],
					"zipCode": requ["zipCode"],
					"country": requ["country"]
				}
				if "aditionalInformation" in requ:
					updateData["aditionalInformation"] = requ["aditionalInformation"]
				updateWhere = {
					"idClient": client["idClient"]
				}
				update = PruebaClass.updateTable("client",updateData,updateWhere)
				if update != None:
					response["data"] = update
					response["result"] = 1
				else:
					response["error"] = "Error: Update Not Completed"
			else:
				response["error"] = "Error: Client Not Found"
		else:
			response["error"] = "Error: Not Parameter Found"
	elif request.method == "DELETE":
		if requ.keys() >= {"idClient"}:
			client = PruebaClass.getSingleFromTable("client","idClient"," AND active = 1 AND idClient = " + str("idClient"))
			if client != None:
				updateData = {
					"active": "0"
				}
				updateWhere = {
					"idClient": client["idClient"]
				}
				delete = PruebaClass.updateTable("client",updateData,updateWhere)
				if delete != None:
					response["data"] = delete
					response["result"] = 1
				else:
					response["error"] = "Error: Delete Not Completed"
			else:
				response["error"] = "Error: Client Not Found"
		else:
			response["error"] = "Error: Not Parameter Found"
	elif request.method == "GET":
		if request.args.get("action"):
			if request.args.get("action") == "All":
				clients = PruebaClass.getMultipleFromTable("client AS a INNER JOIN clientStatusesCat AS b on a.leadStatus = b.idClientStatusesCat",
					"idClient,firstName,lastName,phoneNumber,email,age,b.name AS leadStatus,a.leadStatus AS idLeadStatus,street,aditionalInformation,city,state,zipCode,country,DATE_FORMAT(DATE_SUB(a.insertDate, INTERVAL 6 HOUR),'%Y-%m-%d %H:%i') AS insertDate",
					"AND a.active = 1 AND b.active = 1")
				if len(clients) > 0:
					response["data"] = clients
					response["result"] = 1
				else:
					response["error"] = "Error: No Data Available"
			elif request.args.get("action") == "ById":
				if request.args.get("id"):
					client = PruebaClass.getSingleFromTable("client AS a INNER JOIN clientStatusesCat AS b on a.leadStatus = b.idClientStatusesCat",
						"idClient,firstName,lastName,phoneNumber,email,age,b.name AS leadStatus,a.leadStatus AS idLeadStatus,street,aditionalInformation,city,state,zipCode,country,DATE_FORMAT(DATE_SUB(a.insertDate, INTERVAL 6 HOUR),'%Y-%m-%d %H:%i') AS insertDate",
						"AND a.active = 1 AND b.active = 1 AND idClient = " + str(request.args.get("id")))
					if client != None:
						response["data"] = client
						response["result"] = 1
					else:
						response["error"] = "Error: No Data Available"
				else:
					response["error"] = "Error: Not Parameter Found"
			else:
				response["error"] = "Error: Action Must Be Assign"
		else:
			response["error"] = "Error: Not Parameter Found"
	else:
		response["error"] = "Error: Invalid Method"
	return response