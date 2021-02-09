import pymysql
import requests
from flask import Flask, jsonify

class Main():
	"""docstring for Main"""
	def __init__(self):
		self.host = "localhost"
		self.user = "Pruebas"
		self.pwd = "KEPJS5eEQXNeZa5MxVRe"
		self.port = 3306

	def getSingleFromTable(self, table_name, rows = "*", string_query = "",server = 1):
		if server == 1:
			conn=pymysql.connect(host = self.host, user = self.user, password = self.pwd, db = "prueba", cursorclass = pymysql.cursors.DictCursor)
		result = None
		query = "SELECT " + rows + " FROM " + table_name + " WHERE 1 " + string_query
		try:
			with conn.cursor() as cursor:
				cursor.execute(query)
				result = cursor.fetchone()
		except :
			pass
		finally:
			conn.close()
			return result 

	def getMultipleFromTable (self, table_name, rows = "*", string_query = "",server=1):
		if server == 1:
			conn=pymysql.connect(host = self.host, port=self.port, user = self.user, password = self.pwd, db = "prueba", cursorclass = pymysql.cursors.DictCursor)
		result = None
		query = "SELECT " + rows + " FROM " + table_name + " WHERE 1 " + string_query
		try:
			with conn.cursor() as cursor:
				cursor.execute(query)
				result = cursor.fetchall()
				if len(result) == 0:
					result = []
		except :
			result = []
		finally:
			conn.close()
			return result

	def insertTable (self,table_name, fields, server=1):
		if server == 1:
			conn=pymysql.connect(host = self.host, port=self.port, user = self.user, password = self.pwd, db = "prueba", cursorclass = pymysql.cursors.DictCursor)
		result = None
		query = "INSERT INTO " + table_name + " SET "
		for key in fields: 
			query += key + "='" + fields[key] + "', "
		query = query[0:-2]
		try:
			with conn.cursor() as cursor:
				cursor.execute(query)
				result ={
					"id" : str(conn.insert_id())
				}
				conn.commit()
		except:
			result = None;
		finally:
			conn.close()
			return result

	def updateTable (self,table_name, fields, where,server=1):
		if server == 1:
			conn=pymysql.connect(host = self.host, port=self.port, user = self.user, password = self.pwd, db = "prueba", cursorclass = pymysql.cursors.DictCursor)
		result = None
		query = "UPDATE " + table_name + " SET "
		for key in fields:
			if str(fields[key]) != "null":
				query += key + "='" + str(fields[key]) + "',"
			else:
				query += key + "=" + str(fields[key]) + ","
		query = query[0:-1] + " WHERE 1 "
		for key in where: 
			query += "AND "+ key + "='" + str(where[key]) + "' "
		query = query[0:-1]
		try:
			with conn.cursor() as cursor:
				cursor.execute(query)
				result = {
				"id": str(cursor.lastrowid)
				}
				conn.commit()
		except:
			result = None;
		finally:
			conn.close()
			return result

	def closeConn(this):
		this.conn.close()
