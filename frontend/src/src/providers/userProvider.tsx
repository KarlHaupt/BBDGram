export class ApiResponse<T> {
    private data: T | null = null;
    private error: string | null = null;

    async getData(apiUrl: string) {
        try {
            const res = await fetch(apiUrl,
                {
                    method: 'GET',
                    headers: {
                        'Permissions-Policy': 'ch-ua-form-factor'
                    }
                });
            const resData: T = await res.json();
            this.data = resData;
            return this.data;
        } catch (error) {
            this.error = `Error getting data from ${apiUrl}`;
        }
    }

    
    async postData(apiUrl: string, requestData: object) {
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Permissions-Policy': 'ch-ua-form-factor'
                },
                body: JSON.stringify(requestData)
            });

            if (!res.ok) {
                throw new Error(`Failed with status ${res.status}`);
            }

            const resData: T = await res.json();
            this.data = resData;
            return this.data;
        } catch (error) {
            this.error = `Error posting data to ${apiUrl}`;
        }
    }
}
