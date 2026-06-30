FROM python:3.10-slim

WORKDIR /code

# Install sistem dependensi untuk matplotlib/pillow
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 1. Copy file requirements dari dalam folder api
COPY ./api/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 2. Copy seluruh isi proyek (termasuk folder public dan api) ke dalam container
COPY . .

# 3. Jalankan index.py yang berada di dalam folder api dengan tepat
CMD ["python", "api/index.py"]