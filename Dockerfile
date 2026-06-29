FROM python:3.10-slim

WORKDIR /code

# Install sistem dependensi yang dibutuhkan oleh matplotlib/pillow jika ada
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

# Mengarahkan langsung ke lokasi file index.py yang sesungguhnya
CMD ["python", "index.py"]