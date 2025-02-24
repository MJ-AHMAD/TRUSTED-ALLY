Add-Type -TypeDefinition @"
using System.Net;
using System.Threading.Tasks;
using System.Diagnostics;
public class SimpleHttpServer
{
    private readonly HttpListener _listener = new HttpListener();
    public SimpleHttpServer(string[] prefixes)
    {
        foreach (string prefix in prefixes)
        {
            _listener.Prefixes.Add(prefix);
        }
        _listener.Start();
    }
    public async Task StartAsync()
    {
        while (true)
        {
            var context = await _listener.GetContextAsync();
            Task.Run(() => HandleRequest(context));
        }
    }
    private void HandleRequest(HttpListenerContext context)
    {
        string responseString = "";
        try
        {
            if (context.Request.HttpMethod == "GET" && context.Request.Url.AbsolutePath == "/")
            {
                responseString = System.IO.File.ReadAllText("index.html");
                context.Response.ContentType = "text/html";
            }
            else if (context.Request.HttpMethod == "POST" && context.Request.Url.AbsolutePath == "/submit")
            {
                var body = new System.IO.StreamReader(context.Request.InputStream).ReadToEnd();
                var parsedBody = System.Web.HttpUtility.ParseQueryString(body);
                string name = parsedBody["name"];
                string email = parsedBody["email"];
                string message = parsedBody["message"];
                
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = "powershell.exe";
                startInfo.Arguments = $"-File .\\process-data.ps1 -name \"{name}\" -email \"{email}\" -message \"{message}\"";
                startInfo.RedirectStandardOutput = true;
                startInfo.RedirectStandardError = true;
                startInfo.UseShellExecute = false;
                startInfo.CreateNoWindow = true;
                
                using (Process process = Process.Start(startInfo))
                {
                    string output = process.StandardOutput.ReadToEnd();
                    string error = process.StandardError.ReadToEnd();
                    process.WaitForExit();
                    
                    if (!string.IsNullOrEmpty(error))
                    {
                        throw new Exception(error);
                    }
                }
                
                responseString = "Data submitted successfully!";
            }
            else
            {
                context.Response.StatusCode = 404;
                responseString = "Not Found";
            }
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            responseString = $"Error: {ex.Message}";
        }
        
        var buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        context.Response.ContentLength64 = buffer.Length;
        var output = context.Response.OutputStream;
        output.Write(buffer, 0, buffer.Length);
        output.Close();
    }
}
"@
$server = [SimpleHttpServer]::new(@("http://localhost:8080/"))
$server.StartAsync() | Out-Null
Write-Output "Server started at http://localhost:8080"
