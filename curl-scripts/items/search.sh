#!/bin/sh

API="http://localhost:4741"
URL_PATH="/items"

curl "${API}${URL_PATH}/${TERM}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
