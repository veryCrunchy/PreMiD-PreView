// auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;
    username: string;
    avatar: string;
    global_name: ?string;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
