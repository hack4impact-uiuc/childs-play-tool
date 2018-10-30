from .base import db

ages = db.Enum("12 and Under", "13 and Older", name="age_types")

genders = db.Enum(
    "Male", "Female", "Both", "No Discernable Gender", name="gender_types"
)

symptoms = db.Enum(
    "Bored (Long Term)",
    "Bored (Short Term)",
    "Pain",
    "Anxiety/Hyperactivity",
    "Sadness",
    "Cognitive Impairment",
    name="symptom_types",
)

systems = db.Enum(
    "PlayStation Vita",
    "Xbox One",
    "PlayStation 4",
    "Nintendo Switch",
    "Nintendo 3DS",
    "Apple iOS",
    "Android",
    "PlayStation VR",
    "HTC VIVE",
    "Oculus Rift",
    name="system_types",
)