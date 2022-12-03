from contextvars import ContextVar
from typing import Union, List
from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import csv
import codecs
import pandas as pd
from ml import train_model_and_make_prediction, train_model

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# fileData: pd.DataFrame

var: ContextVar[pd.DataFrame] = ContextVar('var')

some_var = ContextVar("some_var", default="default value")


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": f'{q} dog'}


@app.post("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": '{item.name} dog', "item_id": item_id}


@app.post("/uploadfile/")
async def create_upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    fileData = pd.read_csv(file.file)
    var.set(fileData)
    some_var.set(fileData)
    

    allInputOptions = []
    allOutputOptions = []
    g = fileData.columns.to_series().groupby(fileData.dtypes).groups
    for g_key in g.keys():
        print(g_key)
        if g_key.name == 'bool':
            allOutputOptions.extend(g[g_key])
        else:
            allInputOptions.extend(g[g_key])

    background_tasks.add_task(file.file.close)
    return {"message": f"Successfully uploaded {file.filename}", "allInputOptions": allInputOptions, "allOutputOptions": allOutputOptions}

class ModelOptions(BaseModel):
    outputOption: str
    inputOptions: List[str]
    # file: UploadFile = File(...)

@app.post("/train_model")
async def post_train_model(modelOptions: ModelOptions):
    print(modelOptions)
    # fileData = pd.read_csv(modelOptions.file.file)
    # train_model(fileData, modelOptions.outputOption, modelOptions.inputOptions)
    return {"message": f"Successfully trained model"}