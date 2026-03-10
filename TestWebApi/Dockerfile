FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["BlogPost.Api.csproj", "./"]
RUN dotnet restore "BlogPost.Api.csproj"

COPY . .

RUN dotnet publish "BlogPost.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

RUN mkdir -p /app/static/images

ENTRYPOINT ["dotnet", "BlogPost.Api.dll"]
