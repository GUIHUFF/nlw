import { useEffect, useState, FormEvent } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios';

import { CaretDown, Check, GameController } from "phosphor-react"; 
import { Input } from "./Form/input";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([]);

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>('');

  useEffect(() => {
    axios('http://localhost:1337/games')
    .then(response => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if(!data.name || !data.discord || !data.hourStart || !data.hourEnd || !data.yearsPlaying || (weekDays.length === 0 || gameId === '')) {
      return;
    }
    
    try {
      await axios.post(`http://localhost:1337/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      });

      alert("Anúncio Criado com sucesso")
    }catch(err){
      console.log(err);
      alert('Erro ao criar anúncio');
    }
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root onValueChange={setGameId}>
              <Select.Trigger id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 flex items-center justify-between">
                <Select.Value placeholder="selecione o game que deseja jogar"/>
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='bg-zinc-900 py-3 px-4 rounded text-sm text-white overflow-hidden'>
                  <Select.Viewport>

                    {games.map(game => {
                      return (
                        <Select.Item key={game.id} value={game.id} className="px-4 py-1 cursor-pointer hover:bg-zinc-600 rounded flex items-center relative">
                          <Select.SelectItemIndicator className="absolute left-0 ">
                            <Check />
                          </Select.SelectItemIndicator>
                          <Select.ItemText>{game.title}</Select.ItemText>
                        </Select.Item>
                      )
                    })}

                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>

            </Select.Root>
          </div>

          <div>
            <label htmlFor="name" className="flex flex-col gap-2">Nickname?</label>
            <Input id="name" name="name" placeholder="Como te chamam no game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser 0" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discorf?</label>
              <Input type="text" name="discord" id="discord" placeholder="USER#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type='multiple' 
                className="grid grid-cols-4 gap-1"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item value='0'
                  className={`w-7 h-7 rounded ${weekDays.includes('0') ? 'bg-violet-500': 'bg-zinc-900'}`}
                  title="Domingo">D</ToggleGroup.Item >
                <ToggleGroup.Item  value='1'
                  className={`w-7 h-7 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Segunda">S</ToggleGroup.Item >
                <ToggleGroup.Item  value='2'
                  className={`w-7 h-7 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Terça">T</ToggleGroup.Item >
                <ToggleGroup.Item  value='3'
                  className={`w-7 h-7 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quarta">Q</ToggleGroup.Item >
                <ToggleGroup.Item  value='4'
                  className={`w-7 h-7 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quinta">Q</ToggleGroup.Item >
                <ToggleGroup.Item  value='5'
                  className={`w-7 h-7 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sexta">S</ToggleGroup.Item >
                <ToggleGroup.Item  value='6'
                  className={`w-7 h-7 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sabado">S</ToggleGroup.Item >
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horario do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>
          
          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root 
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if(checked === true){
                  setUseVoiceChannel(true);
                }else{
                  setUseVoiceChannel(false);
                }
              }}
              className="h-6 w-6 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400 m-auto" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close type="button" 
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
            <button type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex gap-3 items-center hover:bg-violet-600"
            >
              <GameController size={24}/>
              Encontrar duo
            </button>
          </footer>
        </form>
        
      </Dialog.Content>
    </Dialog.Portal>
  )
}