FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["TestWebApi/BlogPost.Api.csproj", "TestWebApi/"]
RUN dotnet restore "./TestWebApi/BlogPost.Api.csproj"

COPY . .

WORKDIR "/src/TestWebApi"
RUN dotnet publish "./BlogPost.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

RUN mkdir -p /app/static/images

ENTRYPOINT ["dotnet", "BlogPost.Api.dll"]
