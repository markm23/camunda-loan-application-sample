export async function getFile(assetID) {
    try {
      const response = await fetch("https://pdf-services-ew1.adobe.io/assets/" + assetID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "f5e2470702f744c687ba9b2549c5cd2e",
          "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MTAyNTczNzU5NzlfN2M0ZTU5OTgtZGU3My00ZWU2LWEyY2UtYzE0ODhjOTc4MmFjX3ZhNmMyIiwib3JnIjoiRUZCODFFMkE2NUQ3MjA4ODBBNDk1QzExQEFkb2JlT3JnIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImZiNzQzYTM1OThhZTQ1YWZhZmNiZjg2N2IwZTQ1MGM4IiwidXNlcl9pZCI6IkYxNjAxRUEyNjVENzIwRDUwQTQ5NUNBNUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IkYxNjAxRUEyNjVENzIwRDUwQTQ5NUNBNUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJjdHAiOjMsIm1vaSI6ImUwNGIyZWE1IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MTAyNTczNzU5NzkiLCJzY29wZSI6IkRDQVBJLG9wZW5pZCxBZG9iZUlEIn0.AXCMPYYyhFYzFNoHrqKlFOV7b4MklqPOYYl1_l8czfvrMzLS7w0aH-AvxfHpPf90r5-_Ruo8C5QEsn0kQ26yDJTBuR1FrskCbPUmuzaEfAcz3MYqTU_KLLvQW9arh21uasD-bpxEOV6HH63aEKtP7MixVbVLEqKVmIGVuEaNaQ6nIx1whqtjBJlwl9wkviJPf0jlvmQIcIUH7HN2jSJ29dtaTzNb7p_z7f_K95Q1BcOw1qa_fTrKr4KoV75mOuln3GcwGqrEeXaBCXr8R3UtVFpqJQ6u3gi5aVqTWsEnOi6AUcoaYFp1b4rFY4I4SVWcLMSYdiwXVNT8a0Ll_m6zlA"
        },
      });
  
      if (response.ok) {
        console.log(response);
      } else {
        console.error("Return failed:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  