let storage: Record<string, string> = {};

export const updateStorage = (value: Record<string, any>) =>
    (storage = Object.fromEntries(
        Object.entries(value).map(([k, v]) => [`__MW::${k}`, JSON.stringify(v)])
    ));

updateStorage({
    preferences: {
        state: {
            febboxKey: "exists"
        }
    }
});

(globalThis as any).window = {
    localStorage: {
        getItem: (key: string) => storage[key] || null
    },
    document: {}
};

(globalThis as any).document = (globalThis as any).window.document;

export const updateTurnstileToken = (token: string) =>
    ((
        globalThis as any
    ).document.cookie = `xprime-turnstile-token=${encodeURIComponent(
        JSON.stringify({
            token,
            createdAt: 9007199254740991
        })
    )}`);
