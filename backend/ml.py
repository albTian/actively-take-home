import random
from typing import Dict, List

import pandas as pd
from sklearn import ensemble, linear_model, neural_network

MODEL_TYPES = [
    linear_model.LogisticRegression,
    neural_network.MLPClassifier,
    ensemble.RandomForestClassifier,
]

model = random.choice(MODEL_TYPES)()
currInputs = 0


def train_model_and_make_prediction(
    dataset: pd.DataFrame,
    output: str,
    inputs: List[str],
    hypothetical_input: Dict[str, float],
) -> float:  # probability of output being `True` for hypothetical input
    assert dataset[output].dtype in (bool,)
    assert all(dataset[input].dtype in (float, int) for input in inputs)

    X = dataset[inputs]
    y = dataset[output]

    model.fit(X, y)

    return model.predict_proba(
        pd.DataFrame({input: [hypothetical_input[input]] for input in inputs})
    )[0, model.classes_.tolist().index(True)]


def train_model(
        dataset: pd.DataFrame,
        output: str,
        inputs: List[str],):
    assert dataset[output].dtype in (bool,)
    assert all(dataset[input].dtype in (float, int) for input in inputs)
    currInputs = inputs

    X = dataset[inputs]
    y = dataset[output]

    model = random.choice(MODEL_TYPES)()
    model.fit(X, y)


def predict_model(hypothetical_input: Dict[str, float]):
    return model.predict_proba(
        pd.DataFrame({input: [hypothetical_input[input]] for input in currInputs})
    )[0, model.classes_.tolist().index(True)]
