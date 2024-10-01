from fastapi import FastAPI
from app.routes import user_routes

app = FastAPI()

# Include the user routes
app.include_router(user_routes.router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Hello World"}