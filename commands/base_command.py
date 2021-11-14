import settings

class BaseCommand:

    def __init__(self, description, params):
        self.name = type(self).__name__.lower()
        self.params = params

        desc = f"**{settings.COMMAND_PREFIX}{self.name}**"

        if self.params:
            desc += " " + " ".join(f"*<{p}>*" for p in params)

        desc += f": {description}."
        self.description = desc

    async def handle(self, params, message, client):
        raise NotImplementedError