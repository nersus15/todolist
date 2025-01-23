# TODO-LIST API
This API was created using express js and using mysql as database


# How To Use
1. Download file zip di menu 'code'
2. extract file zip di folder yang diinginkan, rubah nama folder dari 'todolist-main' ke 'todolist'
3. buat database dengan nama todolist
4. import file todolist.sql kedalam database yang sudah dibuat
5. setelah selesai, buka vscode dan open folder todolist (menu file->open folder)
6. setelah itu buka terminal di vscode (menu terminal -> new terminal)
7. kemudian jalankan perintah `npm install` dan  tunggu proses instalasi dependesi selesai
8. setelah semua selesai, untuk menjalankan Rest API jalankan perintah `npm run start:dev` untuk mode dev, atau `npm run start` untuk mode production
9. Secara default API akan berjalan pada port **3000** anda dapat merubahnya dengan mengganti nilai **PORT** pada file **.env**, kemudian jalankan ulang API
## Notes
1. Setiap proses hapus menggunakan metode **soft delete**, atau data tidak benar benar dihapus dari database, melainkan menggunakan bantuan kolom **deleted_at**, jika deleted_at bernilai `Null` berarti data belum dihapus, jika bernilai `date time (yyyy-mm-dd H:i:s)` maka itu adalah waktu data di delete.
2. Proses Authentikasi menggunakan metode Bearer Token, yaitu dengan menambahkan Token kedalam Request Header dengan Key `Authorization`
3. End point `/user` dan `/user/login` tidak memerlukan proses authentikasi.
4. Task yang dibagikan maka akan dapat dilihat dan di berikan komentar oleh user yang ada dalam daftar sharing (dapat dilihat dengan endpoint `GET /task/{id}/sharing`
5. Menambahkan dan menghapus user dari daftar sharing untuk task tertentu hanya bisa dilakukan oleh pemilik/pembuat tugas

# API REFERENCES

 1. `POST /user` untuk melakukan registrasi
	#### Body (JSON)
	 
	|  Key | Keterangan | Default | Required | Contoh |
	| ----- | ------------- | --------- | ---------- | -
	| username | Username baru | | required | username_1 |
	| password | password baru | | required | pass1231 |
	| nama | nama lengkap user | | required | nama lengkap |
	#### Contoh Body (JSON)
		
	   {
			"username": "username_1",
			"password: "pass1231",
			"nama": "nama lengkap"
	   }

 2. `POST /user/login` Untuk login
	 |  Key | Keterangan | Default | Required | Contoh |
	| ----- | ------------- | --------- | ---------- | -
	| username | Username baru | | required | username_1 |
	| password | password baru | | required | pass1231 |
	#### Contoh Body (JSON)
		
	   {
			"username": "username_1",
			"password: "pass1231",
	   }
	Simpan respons token yang di kembalikan untuk keperluan authentikasi
3. `GET /tasks ` mendapatkan daftar tugas (pribadi, dan sharing)
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

4. `GET /tasks/shared ` mendapatkan daftar tugas yang dibagikan kepada anda
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

5. `GET /tasks/my ` mendapatkan daftar tugas yang anda buat
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

6. `GET /task/{id}` mendapatkan detail tugas berdasarkan id tugas
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

7. `POST /task ` membuat tugas baru
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

	#####  BODY (JSON)
	|  Key | Keterangan | Default | Required | Contoh |
	| ----- | ------------- | --------- | ---------- | -
	| title| Judul tugas| | required | task 1 |
	| body | Keterangan tugas yang anda buat | | required | Tugas ini untuk testing|

8.  `PUT /task/{id}` untuk update tugas
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

	#####  BODY (JSON)
	|  Key | Keterangan | Default | Required | Contoh |
	| ----- | ------------- | --------- | ---------- | -
	| title| Judul tugas| | required | task 1 |
	| body | Keterangan tugas yang anda buat | | required | Tugas ini untuk testing|

9. `POST /task/{id}/status ` untuk merubah status tugas
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

	#####  BODY (JSON)
	|  Key | Keterangan | Default | Required | Contoh |
	| ----- | ------------- | --------- | ---------- | -
	| status| String Status tugas, salah satu dari [OPEN, ON PROGRES, PENDING, COMPLETED, CANCELED]| | required | CANCELED |

10. `DELETE /task/{id} ` untuk hapus tugas
	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key `Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

11.  `GET /task/{id}/sharing ` untuk melihat daftar user yang dibagikan tugas ini
		##### HEADERS
		Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

 12.  `DELETE /task/{id}/share` untuk membagikan tugas ke user tertentu
		##### HEADERS
		Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**
	
		#####  BODY (JSON)
		|   Key | Keterangan | Default | Required | Contoh |
		| ----- | ------------- | --------- | ---------- | -
		| users| Array of string dari user id | | required | ["user-lVIx2foWUkoeTeeY", "user-sfds23ff4KS"]|

 13. `POST /task/{id}/share` untuk menghapus user tertentu dari daftar sharing tugas 
		##### HEADERS
		Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**
	
		#####  BODY (JSON)
		|   Key | Keterangan | Default | Required | Contoh |
		| ----- | ------------- | --------- | ---------- | -
		| users| Array of string dari user id | | required | ["user-lVIx2foWUkoeTeeY", "user-sfds23ff4KS"]|

12.  `POST /task/{id}/comments` untuk menambahkan komentar pada tugas tertentu
		##### HEADERS
		Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**
	
		#####  BODY (JSON)
		|   Key | Keterangan | Default | Required | Contoh |
		| ----- | ------------- | --------- | ---------- | -
		| content| String Komentar yang mau diberikan | | required | Komentar pertama|

13.  `GET/task/{id}/comments` untuk mendapatkan daftar komentar dari tugas tertentu
		##### HEADERS
		Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

14. `DELETE /task/{id}/comment/{commentId}` untuk menghapus komentar tertentu dari tugas tertentu

	##### HEADERS
	Sertakan Token yang didapatkan ketika login berhasil kedalam HEADER REQUEST dengan key 		`Authorization` dengan nilai `Bearer {token anda}` untuk authentikasi, contoh `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVpZC03dUppYVdKTnlwRGY1dHoxIiwiaWF0IjoxNzM3NjM0ODcxfQ.-4kduuopJuxIGj2k-bPzap7zH0YyMscmxcjB43iHtw8`, jika menggunakan postman/sejenisnya cukup masukkan token saja tanpa `Bearer` karena otomatis ditambahkan ketika memilih metode authentikasi **Bearer Token**

