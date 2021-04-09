from django.core.management.base import BaseCommand, CommandError
from chattingtransformer import ChattingGPT2
from ...models import WarmingMailTemplate


class Command(BaseCommand):
    help = 'Generate random emails for mail warming up.'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, count, **options):
        if count <= 0:
            return

        model_name = "gpt2"
        gpt2 = ChattingGPT2(model_name)

        total_generated = 0

        for i in range(0, count):
            text = "Fruits"
            subject = gpt2.generate_text(text, min_length=10, max_length=20)
            content = gpt2.generate_text(text, min_length=100, max_length=200)

            subject = subject.replace("\n", " ")[:100]
            content = content[:1024]

            template = WarmingMailTemplate(subject=subject, content=content)
            template.save()

            print(f"{i + 1}/{count} done")
            total_generated += 1

        print(f"{total_generated} templates are generated!!!")
