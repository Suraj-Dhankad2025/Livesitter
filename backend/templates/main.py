from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['overlay_settings_db']
collection = db['overlay_settings']

# Create operation: Add a new overlay setting
@app.route('/overlay_settings', methods=['POST'])
def create_overlay_setting():
    data = request.json
    inserted_id = collection.insert_one(data).inserted_id
    return jsonify({'message': 'Overlay setting created successfully', '_id': str(inserted_id)}), 201

# Read operation: Retrieve all overlay settings
@app.route('/overlay_settings', methods=['GET'])
def get_overlay_settings():
    overlay_settings = list(collection.find())
    for setting in overlay_settings:
        setting['_id'] = str(setting['_id'])  # Convert ObjectId to string
    return jsonify(overlay_settings)

# Update operation: Modify an existing overlay setting
@app.route('/overlay_settings/<string:setting_id>', methods=['PUT'])
def update_overlay_setting(setting_id):
    data = request.json
    collection.update_one({'_id': ObjectId(setting_id)}, {'$set': data})
    return jsonify({'message': 'Overlay setting updated successfully'})

# Delete operation: Delete an existing overlay setting
@app.route('/overlay_settings/<string:setting_id>', methods=['DELETE'])
def delete_overlay_setting(setting_id):
    collection.delete_one({'_id': ObjectId(setting_id)})
    return jsonify({'message': 'Overlay setting deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
