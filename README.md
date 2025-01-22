# Employee Card Generator

A **React application** to generate downloadable employee profile cards. This project was created as an frontend developer evaluation task.

---

## **Description**

This React application allows users to generate downloadable employee profile cards. Users can:
- Fetch a list of random users from an external API.
- Select and edit a user’s profile information.
- Finalize and download the profile card as a PNG image.

---

## **Features**

- Fetches a list of random users from an external API.
- Displays a list of users with:
  - Profile pictures
  - Names
  - Designations
  - Companies
- Allows users to:
  - View profile details.
  - Edit profile information (name, designation, and company).
  - Download the profile card as a **PNG image**.
- Supports **light and dark mode themes**.

---

## **Getting Started**

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd employee-card-generator
   ```
3. Install Dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## **Usage**

1. **Open the application** in your browser.
2. **Fetch users:** Click the **"Refresh"** button to load a list of random users.
3. **Select a user:** Click on a user to view their profile details.
4. **Edit profile:** Click the **"Edit"** button, update the information, and save your changes.
5. **Download card:** Click the **"Download"** button to save the profile card as a PNG image.
6. **Reset:** Click the **"Reset"** button to clear the selection and reset the profile card.
7. **Theme toggle:** Use the **sun/moon icon** in the top-right corner to switch between light and dark modes.

---

## **Tech Stack**

- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **Axios**: For API requests.
- **react-html2canvas**: To generate PNG images from HTML elements.
- **Lucide React**: For icons.
- **Vite**: For fast builds and development.

---

## **Additional Notes**

- The application uses the [randomuser.me API](https://randomuser.me/) to fetch random users.
- This is a **basic React application** and can be further customized to meet specific requirements.
- Built with **Vite**, a fast and modern build tool for web development.
