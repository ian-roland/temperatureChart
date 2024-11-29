# Temperature Chart 🎫

This is a webapp focused on tracking the Temperature of a computer that runs linux, in my case a Raspberry Pi CM4, this project was developed as a form of studying in my internship at Cole Design and Development.



<div align="center">
<img src="https://github.com/user-attachments/assets/3434a7ef-3fbd-4bc9-8fc2-8abe40a47792" width="800" align="center" />
</div>

## Reference Sheet 📑

- [Figma](https://www.figma.com/community/file/1392276515495389646)
- [Colors](https://tailwindcss.com/docs/customizing-colors)

## Tools 🔧
### Back-end
- [NodeJS](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)

### Front-end
- [ReactJS](https://react.dev/)
- [ViteJS](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DayJS](https://day.js.org/)
- [Typescript](https://www.typescriptlang.org/)

## Getting Started

1. Inside the backend folder, replace the tempScript.py endpoint with the ip of the machine that is going to be monitored (in my case the Raspberry Pi CM4).
   ```sh
     app.run(host='yourMachineIP', port=3334)
   ```

2. Inside the chartComponent.tsx file (frontend\src\components\chartComponent.tsx), replace the link in the fetch() (line 39) with your flask api endpoint.
   ```sh
     fetch("http://yourApiEndpoint:3334/temperature_and_datetime")
   ```

3. Inside the frontend folder, run the npm install command.
   ```sh
     sudo npm install
   ```

4. Inside the backend folder, run the pip install command.
   ```sh
     sudo pip install
   ```

5. Inside the backend folder, run the tempScript.py.
   ```sh
     python tempScript.py
   ```

6. Inside the frontend folder.
   ```sh
     npm run dev
   ```

7. Access the link vite gave you in the terminal.
  * Example:
  ```sh
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.15.48:5173/
  ```

---
