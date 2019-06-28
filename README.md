RESTaurant-API is the backend for a restaurant inventory application that was designed and coded by Adam Caplan, Jeremy Denton, Merritt Blanks, and Oliver Sablove, as part of a project for General Assembly.

The app is designed to provide an easy way for restaurants to track their inventory.

*Relevant Links*
Backend deployed: https://morning-hollows-81329.herokuapp.com/
Frontend repo: https://github.com/namast-ai/RESTaurant-client
Frontend deployed: https://namast-ai.github.io/RESTaurant-client/

*Technologies Used:*
- Express.js
- Node.js
- Mongoose
- MongoDB

<!-- ******Planning, process....****

*******Unsolved problems:*********** -->

## API End Points

| Verb   | URI Pattern               | Routes#Action |
|--------|---------------------------|-------------------------|
| POST   | `/sign-up`                | `users#signup`          |
| POST   | `/sign-in`                | `users#signin`          |
| DELETE | `/sign-out`               | `users#signout`         |
| PATCH  | `/change-password`        | `users#changepassword`  |
| GET    | `/items`                  | `item#index`            |
| POST   | `/items`                  | `item#create`           |
| GET    | `/items/:id`              | `items#show`            |
| PATCH  | `/items/:id`              | `items#update`          |
| DELETE | `/items/:id`              | `items#destroy`         |

All data returned from API actions is formatted as JSON.
## User Actions

_Note_: Sending JSON data via curl scripts will require specifying the content-
type, however jQuery.ajax defaults to JSON.

*Summary:*

<table>
<tr>
  <th colspan="4">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Headers</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
<td>POST</td>
<td>`/sign-up`</td>
<td><strong>credentials</strong></td>
<td>empty</td>
<td>201, Created</td>
<td><strong>user</strong></td>
</tr>
<tr>
  <td colspan="4"></td>
  <td>400 Bad Request</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/sign-in`</td>
<td><strong>credentials</strong></td>
<td>empty</td>
<td>200 OK</td>
<td><strong>user w/token</strong></td>
</tr>
<tr>
  <td colspan="4"></td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>DELETE</td>
<td>`/sign-out`</td>
<td>empty</td>
<td><strong>token</strong></td>
<td>201 Created</td>
<td>empty</td>
</tr>
<tr>
  <td colspan="4"></td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/change-password`</td>
<td><strong>passwords</strong></td>
<td><strong>token</strong></td>
<td>204 No Content</td>
<td><strong>user w/token</strong></td>
</tr>
<tr>
  <td colspan="4"></td>
  <td>400 Bad Request</td>
  <td><em>empty</em></td>
</tr>
</table>

### signup

The `create` action expects a *POST* of `credentials` identifying a new user to
create, e.g. using `getFormFields`:

```html
<form>
  <input name="credentials[email]" type="text" value="an@example.email">
  <input name="credentials[password]" type="password" value="an example password">
  <input name="credentials[password_confirmation]" type="password" value="an example password">
</form>
```

or using `JSON`:

```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password",
    "password_confirmation": "an example password"
  }
}
```

The `password_confirmation` field is optional.

If the request is successful, the response will have an HTTP Status of 201,
Created, and the body will be JSON containing the `id` and `email` of the new
user, e.g.:

```json
{
  "user":
  {"__v":0,
    "updatedAt":"2019-06-26T13:02:08.135Z",
    "createdAt":"2019-06-26T13:02:08.135Z",
    "email":"d@a.com",
    "_id":"5d136cd016dca21a47a81a8d"
    }
  }
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
Request, and the response body will be empty.

### signin

The `signin` action expects a *POST* with `credentials` identifying a previously
registered user, e.g.:

```html
<form>
  <input name="credentials[email]" type="text" value="an@example.email">
  <input name="credentials[password]" type="password" value="an example password">
</form>
```

or:

```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password"
  }
}
```

If the request is successful, the response will have an HTTP Status of 200 OK,
and the body will be JSON containing the user's `id`, `email`, and the `token`
used to authenticate other requests, e.g.:

```json
{
  "user":
  {
    "token":"57761549cfed9395a3c9135e2072a2a2",
    "_id":"5d136cd016dca21a47a81a8d",
    "updatedAt":"2019-06-26T13:04:36.570Z",
    "createdAt":"2019-06-26T13:02:08.135Z",
    "email":"d@a.com",
    "__v":0
    }
  }

```

If the request is unsuccessful, the response will have an HTTP Status of 401
Unauthorized, and the response body will be empty.

### signout

The `signout` action expects a *DELETE* request and must include the user's
token but no data is necessary to be sent.

If the request is successful the response will have an HTTP status of 204 No
Content.

If the request is unsuccessful, the response will have a status of 401
Unauthorized.

### changepw

The `changepw` action expects a PATCH of `passwords` specifying the `old` and
`new`, eg.:

```html
<form>
  <input name="passwords[old]" type="password">
  <input name="passwords[new]" type="password">
</form>
```

or:

```json
{
  "passwords": {
    "old": "example password",
    "new": "new example password"
  }
}
```

If the request is successful the response will have an HTTP status of 204 No
Content.

If the request is unsuccessful the reponse will have an HTTP status of 400 Bad
Request.

---

The `sign-out` and `change-password` requests must include a valid HTTP header
`Authorization: Bearer ${TOKEN}` or they will be rejected with a status of
401 Unauthorized.

# Item Actions

All item action requests must include a valid HTTP header `Authorization: Bearer ${TOKEN}` or they will be rejected with a status of 401 Unauthorized.

All of the item actions follow the *RESTful* style.

*Summary:*

<table>
<tr>
  <th colspan="3">Request</th>
  <th colspan="2">Response</th>
</tr>
<tr>
  <th>Verb</th>
  <th>URI</th>
  <th>body</th>
  <th>Status</th>
  <th>body</th>
</tr>
<tr>
  <td colspan="3">
  The default is to retrieve all items associated with the user..
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>POST</td>
<td>`/items`</td>
<td>'{}'</td>
<td>201, Created</td>
<td><strong>item created</strong></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
<td>GET</td>
<td>`/items/:id`</td>
<td>n/a</td>
<td>200, OK</td>
<td><strong>item found</strong</td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>401 Unauthorized</td>
  <td><em>empty</em></td>
</tr>
<tr>
  <td colspan="3">
  </td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>PATCH</td>
<td>`/items/:id`</td>
<td><strong>item delta</strong></td>
<td>200, OK</td>
<td><strong>item updated</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
<tr>
<td>DELETE</td>
<td>`/items/:id`</td>
<td><strong>'{}'</strong></td>
<td>204, OK</td>
<td><strong>item updated</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>400 Bad Request</td>
  <td><strong>errors</strong></td>
</tr>
<tr>
  <td colspan="3"></td>
  <td>404 Not Found</td>
  <td><em>empty</em></td>
</tr>
</table>

## index

The `index` action is a *GET* that retrieves all the items. The response body will contain JSON containing an array of items, e.g.:

```json
{
  "items": [
    {
      "_id":"5d135788ae31fe1537c5d59a",
      "updatedAt":"2019-06-26T11:31:20.321Z",
      "createdAt":"2019-06-26T11:31:20.321Z",
      "name":"Sofa",
      "quantity":972,
      "price":89.98,
      "owner":"5d12da1ea77ac21a4972ba9a",
      "__v":0
    },
    {
      "_id":"5d13579bae31fe1537c5d59b",
      "updatedAt":"2019-06-26T11:31:39.427Z",
      "createdAt":"2019-06-26T11:31:39.427Z",
      "name":"Table",
      "quantity":98,
      "price":69.98,
      "owner":"5d12da1ea77ac21a4972ba9a",
      "__v":0
    }
  ]
}
```

### Example of using the optional query parameter

End point to fetch all of a user's items

```md
/items
```

## create

The `signin` action expects a *POST* with `credentials` identifying a previously
registered user, e.g.:

```html
<form>
  <input name="item[name]" type="text" value="spoon">
  <input name="item[quantity]" type="number" value="591">
  <input name="item[price]" type="number" value="3.99">
</form>
```

or:

```json
{
  "item": {
    "name": "spoon",
    "quantity": "591",
    "price": "3.99"
  }
}
```

The `create` action expects a *POST* with an empty body (e.g `''` or `'{}'` if
JSON). If the request is successful, the response will have an HTTP Status of
201 Created, and the body will contain JSON of the created item with `owner`
set to the user calling `create`, e.g.:

```json
{
  "item":
  {
    "__v":0,
    "updatedAt":"2019-06-26T13:48:54.469Z",
    "createdAt":"2019-06-26T13:48:54.469Z",
    "name":"Spoon",
    "quantity":457,
    "price":3.98,
    "owner":"5d1359b8ae31fe1537c5d59d",
    "_id":"5d1377c616dca21a47a81a8e"
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
 Request, and the response body will be JSON describing the errors.

## show

The `show` action is a *GET* specifing the `id` of the item to retrieve. If the
request is successful the status will be 200, OK, and the response body will
contain JSON for the item requested, e.g.:

```json
{
  "item":
  {
    "_id":"5d135ad7ae31fe1537c5d5a2",
    "updatedAt":"2019-06-26T11:45:27.895Z",
    "createdAt":"2019-06-26T11:45:27.895Z",
    "name":"Knives",
    "quantity":99,
    "price":3.98,
    "owner":"5d135aa2ae31fe1537c5d5a1",
    "__v":0
  }
}

```

## update

### update a item's states

This `update` action expects a *PATCH* with changes to to an existing item.

You may want to store the cell `index` in an HTML element that is not a form.
To do this, you could utilize data attributes and add the `value` and `over`
properties using javascript.

```html
<div data-cell-index='0'>
</div>
```

The `update` action expects data formatted as such:

```json
{
  "item": {
      "name": "Spork",
      "quantity": "299",
      "price": "1.99"
    }
  }
```

If the request is successful, the response will have an HTTP Status of 200 OK,
and the body will be JSON containing the modified item, e.g.:

```json
{
  "item":
  {
    "_id":"5d135ad7ae31fe1537c5d5a2",
    "updatedAt":"2019-06-26T11:47:28.111Z",
    "createdAt":"2019-06-26T11:45:27.895Z",
    "name":"Spork",
    "quantity":299,
    "price":1.99,
    "owner":"5d135aa2ae31fe1537c5d5a1",
    "__v":0
  }
}
```

If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
Request, and the response body will be JSON describing the errors.
