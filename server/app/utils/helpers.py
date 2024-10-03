import logging
from datetime import datetime
import uuid
import hashlib

# Configure logging
logger = logging.getLogger("app_logger")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

def generate_unique_id() -> str:
    """Generate a unique identifier using UUID4."""
    return str(uuid.uuid4())

def hash_text(text: str) -> str:
    """Return a SHA256 hash of the given text."""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def format_datetime(dt: datetime) -> str:
    """Format a datetime object to a string."""
    return dt.strftime("%Y-%m-%d %H:%M:%S")

def parse_datetime(date_string: str) -> datetime:
    """Parse a datetime string to a datetime object."""
    return datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")

def log_info(message: str):
    """Log an informational message."""
    logger.info(message)

def log_error(message: str):
    """Log an error message."""
    logger.error(message)