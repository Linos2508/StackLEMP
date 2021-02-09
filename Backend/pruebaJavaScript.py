from flask import Flask
from flask_cors import cross_origin

def create_app():
    app = Flask(__name__)

    with app.app_context():
       pass
    return app

app = create_app()

@app.route('/',methods=['GET'])
@cross_origin()
def home():
	return {"starting": "Hola, Mundo!", "name": "Stack LEMP", "version": "V1.0.0"}

@app.route('/manage/Leads',methods=['GET','POST','PUT','DELETE'])
@cross_origin()
def manageLeads():
	from apiPruebaJavaScript.manageLeads import manageLeads
	return manageLeads()

if __name__ == '__main__':
	app.run("0.0.0.0",port=5000,debug=True)