# JSON Web Token (JWT) Command Line Interface (CLI)

## Show help

```bash
jwt
```

Returns:
```bash
jsonwebtokencli

  A json web token command line interface

Options

  -h, --help
  -d, --decode
  -e, --encode
  -s, --secret string
  --private-key-file string
  --public-key-file string
  -t, --timestamp
  --algorithm string
  --algorithms string[]
  --jwt string
```

## Decode a HS256 token using secret

```bash
jwt --secret secret --decode eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

```json
{"sub":"1234567890","name":"John Doe","admin":true}
```

## Encode a HS256 token using secret:

```bash
jwt --secret secret --encode '{"sub":"1234567890","name":"John Doe","admin":true}'
```

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

## Decode a RS256 token using public key:
